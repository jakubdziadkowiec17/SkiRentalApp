using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Controllers;
using webapi;
using webapi.Models.Entities;
using Moq;

namespace webapiUnitTests
{
    public class CategoryControllerUnitTest
    {
        [Fact]
        public async Task GetCategoryList_ReturnsList()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "GetCategoryList_ReturnsList").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new CategoryController(context);

            var result = await controller.GetCategoryList();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<Category>>>(result);
            var CategoryList = Assert.IsType<List<Category>>(actionResult.Value);
            Assert.NotNull(CategoryList);
        }

        [Fact]
        public async Task GetCategory_ReturnsCategory()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "GetCategory_ReturnsCategory").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new CategoryController(context);
            var temp = new Category { Id = 1, Name = "temp" };
            context.Category.Add(temp);
            await context.SaveChangesAsync();

            var result = await controller.GetCategory(1);

            var actionResult = Assert.IsType<ActionResult<Category>>(result);
            var Category = Assert.IsType<Category>(actionResult.Value);
            Assert.Equal(1, Category.Id);
        }

        [Fact]
        public async Task PostCategory_ReturnsCreatedAtActionResult()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "PostCategory_ReturnsCreatedAtActionResult").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new CategoryController(context);

            var result = await controller.PostCategory(new Category { Id = 1, Name = "temp" });

            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdCategory = Assert.IsType<Category>(createdAtActionResult.Value);
            Assert.Equal(1, createdCategory.Id);
        }

        [Fact]
        public async Task DeleteCategory_ReturnsNoContent()
        {
            var dbContext = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "DeleteCategory_ReturnsNoContent").Options;
            var context = new ApplicationDbContext(dbContext);
            var controller = new CategoryController(context);
            var temp = new Category { Id = 1, Name = "temp" };
            context.Category.Add(temp);
            await context.SaveChangesAsync();

            var result = await controller.DeleteCategory(1);

            Assert.IsType<NoContentResult>(result);
        }
    }
}