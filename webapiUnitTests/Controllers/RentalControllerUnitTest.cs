using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Controllers;
using webapi;
using webapi.Models.Entities;
using Moq;

namespace webapiUnitTests
{
    public class RentalControllerUnitTest
    {
        [Fact]
        public async Task GetRentalList_ReturnsList()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "GetRentalList_ReturnsList").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new RentalController(context);

            var result = await controller.GetRentalList();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<Rental>>>(result);
            var RentalList = Assert.IsType<List<Rental>>(actionResult.Value);
            Assert.NotNull(RentalList);
        }

        [Fact]
        public async Task GetRental_ReturnsRental()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "GetRental_ReturnsRental").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new RentalController(context);
            var temp = new Rental { Id = 1, Name = "temp", Email = "temp@temp", EquipmentId = "temp", Hours=1, LastName = "temp", PhoneNumber="123456789", Price=1, RentalDate=DateTime.Now, Returned=false};
            context.Rental.Add(temp);
            await context.SaveChangesAsync();

            var result = await controller.GetRental(1);

            var actionResult = Assert.IsType<ActionResult<Rental>>(result);
            var Rental = Assert.IsType<Rental>(actionResult.Value);
            Assert.Equal(1, Rental.Id);
        }

        [Fact]
        public async Task PostRental_ReturnsCreatedAtActionResult()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "PostRental_ReturnsCreatedAtActionResult").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new RentalController(context);
            var temp = new Equipment { Id = "1", Name = "temp", CategoryId = 1, Color = "temp", PricePerHour = 1, Series = "temp", Size = 1 };
            context.Equipment.Add(temp);
            await context.SaveChangesAsync();

            var result = await controller.PostRental(new Rental { Id = 1, Name = "temp", Email = "temp@temp", EquipmentId = "1", Hours = 1, LastName = "temp", PhoneNumber = "123456789", Price = 1, RentalDate = DateTime.Now, Returned = false });

            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdRental = Assert.IsType<Rental>(createdAtActionResult.Value);
            Assert.Equal(1, createdRental.Id);
        }

        [Fact]
        public async Task DeleteRental_ReturnsNoContent()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "DeleteRental_ReturnsNoContent").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new RentalController(context);
            var temp = new Rental { Id = 1, Name = "temp", Email = "temp@temp", EquipmentId = "temp", Hours = 1, LastName = "temp", PhoneNumber = "123456789", Price = 1, RentalDate = DateTime.Now, Returned = false };
            context.Rental.Add(temp);
            await context.SaveChangesAsync();

            var result = await controller.DeleteRental(1);

            Assert.IsType<NoContentResult>(result);
        }
    }
}