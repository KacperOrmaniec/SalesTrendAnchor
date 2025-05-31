
using SalesTrendAnchor.Api.Endpoints;
using SalesTrendAnchor.Core;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCore();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapEndpoints();

app.Run();
