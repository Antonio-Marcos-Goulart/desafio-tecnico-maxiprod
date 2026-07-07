using GastosResidenciais.Api.Data;
using GastosResidenciais.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly AppDbContext _context;

    public TotaisController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/totais
    [HttpGet]
    public async Task<ActionResult> GetTotais()
    {
        var pessoas = await _context.Pessoas.Include(p => p.Transacoes).ToListAsync();

        var porPessoa = pessoas.Select(pessoa =>
        {
            // Agrupa as transações da pessoa por Tipo (Receita/Despesa) e soma o Valor de cada grupo.
            var somaPorTipo = pessoa.Transacoes
                .GroupBy(t => t.Tipo)
                .ToDictionary(grupo => grupo.Key, grupo => grupo.Sum(t => t.Valor));

            var totalReceitas = somaPorTipo.GetValueOrDefault(TipoTransacao.Receita);
            var totalDespesas = somaPorTipo.GetValueOrDefault(TipoTransacao.Despesa);

            return new
            {
                pessoaId = pessoa.Id,
                nome = pessoa.Nome,
                totalReceitas,
                totalDespesas,
                saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        var totalGeral = new
        {
            totalReceitas = porPessoa.Sum(p => p.totalReceitas),
            totalDespesas = porPessoa.Sum(p => p.totalDespesas),
            saldo = porPessoa.Sum(p => p.saldo)
        };

        return Ok(new { porPessoa, totalGeral });
    }
}
