using GastosResidenciais.Api.Data;
using GastosResidenciais.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/transacoes
    // GET /api/transacoes?pessoaId=1
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes([FromQuery] int? pessoaId)
    {
        var query = _context.Transacoes.AsQueryable();

        if (pessoaId is not null)
        {
            query = query.Where(t => t.PessoaId == pessoaId);
        }

        return await query.ToListAsync();
    }

    // POST /api/transacoes
    [HttpPost]
    public async Task<ActionResult<Transacao>> CreateTransacao(Transacao transacao)
    {
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
        if (pessoa == null)
        {
            return BadRequest("Pessoa não encontrada.");
        }
        if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
        {
            return BadRequest("Pessoa menor de idade só pode cadastrar transações do tipo Despesa.");
        }

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
    }
}
