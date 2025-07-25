using SalesTrendAnchor.Api;
using SalesTrendAnchor.Api.Endpoints;
using SalesTrendAnchor.Core;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCore();
builder.Services.AddApi();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://stademo.netlify.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.MapEndpoints();

app.Run();
