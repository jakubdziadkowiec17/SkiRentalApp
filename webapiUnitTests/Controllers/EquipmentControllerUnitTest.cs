using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Controllers;
using webapi;
using webapi.Models.Entities;
using Moq;

namespace webapiUnitTests
{
    public class EquipmentControllerUnitTest
    {
        [Fact]
        public async Task GetEquipmentList_ReturnsList()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "GetEquipmentList_ReturnsList").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new EquipmentController(context);

            var result = await controller.GetEquipmentList();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<Equipment>>>(result);
            var equipmentList = Assert.IsType<List<Equipment>>(actionResult.Value);
            Assert.NotNull(equipmentList);
        }

        [Fact]
        public async Task GetEquipment_ReturnsEquipment()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "GetEquipment_ReturnsEquipment").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new EquipmentController(context);
            var temp = new Equipment { Id = "1", Name = "temp", CategoryId = 1, Color = "temp", PricePerHour = 1, Series = "temp", Size = 1 };
            context.Equipment.Add(temp);
            await context.SaveChangesAsync();

            var result = await controller.GetEquipment("1");

            var actionResult = Assert.IsType<ActionResult<Equipment>>(result);
            var equipment = Assert.IsType<Equipment>(actionResult.Value);
            Assert.Equal("1", equipment.Id);
        }

        [Fact]
        public async Task PostEquipment_ReturnsCreatedAtActionResult()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "PostEquipment_ReturnsCreatedAtActionResult").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new EquipmentController(context);

            var result = await controller.PostEquipment(new Equipment { Id = "1", Name = "temp", CategoryId = 1, Color = "temp", PricePerHour = 1, Series = "temp", Size = 1 });

            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdEquipment = Assert.IsType<Equipment>(createdAtActionResult.Value);
            Assert.Equal("1", createdEquipment.Id);
        }

        [Fact]
        public async Task DeleteEquipment_ReturnsNoContent()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "DeleteEquipment_ReturnsNoContent").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new EquipmentController(context);
            var temp = new Equipment { Id = "1", Name = "temp", CategoryId = 1, Color = "temp", PricePerHour = 1, Series = "temp", Size = 1 };
            context.Equipment.Add(temp);
            await context.SaveChangesAsync();

            var result = await controller.DeleteEquipment("1");

            Assert.IsType<NoContentResult>(result);
        }
    }
}