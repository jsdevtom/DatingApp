using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(
            IDatingRepository repository,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig
        )
        {
            _repository = repository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhotoAsync(int id)
        {
            var photoFromRepo = await _repository.GetPhotoAsync(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUserAsync(
            int userId,
            [FromForm]
            PhotoForCreationDto photoForCreationDto
        )
        {
            var isRequestUserUpdatingUser = userId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!isRequestUserUpdatingUser)
                return Unauthorized();

            var userFromRepo = await _repository.GetUserAsync(userId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file != null && file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            // here is where errror NullReferenceException: Object reference not set to an instance of an object.
//            DatingApp.API.Controllers.PhotosController.AddPhotoForUser(int userId, PhotoForCreationDto photoForCreationDto) in PhotosController.cs
            else
            {
                return BadRequest("no file was uploaded");
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            var doesUserHaveMainPhoto = userFromRepo.Photos.Any(u => u.IsMain);

            if (!doesUserHaveMainPhoto)
                photo.IsMain = true;

            userFromRepo.Photos.Add(photo);


            if (await _repository.SaveAllAsync())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                // TODO-Tom: replace with a created at route response.
                return CreatedAtRoute("GetPhoto", new {id = photo.Id}, photoToReturn);
            }

            return BadRequest("Could not add the photo.");
        }

        [HttpPost("{id}/set-main")]
        public async Task<IActionResult> SetMainPhotoAsync(int userId, int id)
        {
            var isRequestUserUpdatingUser = userId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!isRequestUserUpdatingUser)
                return Unauthorized();

            var user = await _repository.GetUserAsync(userId);

            if (!user.Photos.Any(photo => photo.Id == id))
                return BadRequest("I can't set the main photo of a photo id the user does not have");

            var photoFromRepo = await _repository.GetPhotoAsync(id);

            if (photoFromRepo.IsMain)
                return BadRequest("requested photo is already the main photo");

            var currentMainPhoto = await _repository.GetMainPhoto(userId);

            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (await _repository.SaveAllAsync())
                return NoContent();

            return BadRequest("could not set photo to main");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int userId, int id)
        {
             var isRequestUserUpdatingUser = userId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!isRequestUserUpdatingUser)
                return Unauthorized();

            var user = await _repository.GetUserAsync(userId);

            if (!user.Photos.Any(photo => photo.Id == id))
                return BadRequest("I can't delete the photo of a photo id the user does not have");

            var photoFromRepo = await _repository.GetPhotoAsync(id);

            if (photoFromRepo.IsMain)
            {
                var photoNotMain = user.Photos.FirstOrDefault(photo => !photo.IsMain);

                if (photoNotMain != null)
                {
                    photoNotMain.IsMain = true;
                }
            
//                return BadRequest("requested photo is already the main photo");    
            }

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result?.Result == "ok")
                {
                    _repository.Delete(photoFromRepo);
                }    
            }

            if (photoFromRepo.PublicId == null)
            {
                _repository.Delete(photoFromRepo);
            }
            
            if (await _repository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest();

        }
        
    }
}
