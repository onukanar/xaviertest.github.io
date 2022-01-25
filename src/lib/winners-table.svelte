<script>
export let results = [];

</script>
{#each results as w, i}
  <p>
    <b>#{i + 1}</b> {@html w.chain.join( " &rarr; " )}<br>

  </p>

  <div class="instructions">
    <table class="styled-table">
      <thead>
        <tr>
			<th>işlem</th>
           <th>Pazar</th>
           <th>Fiyat</th>
           <th>Miktar</th>
           <th>Toplam</th>
        </tr>
      </thead>
      <tbody>
      {#each w.orders as o,j}
        <tr>
          <td>
            {#if o.side === "buy"}
            <b style="color: #02c076">SATIN AL</b>
            {:else}
            <b style="color: #f84960">SAT</b>
            {/if}
          </td>
          <td><a href={o.link} target="_blank">{o.market}</a></td>
          <td>{o.price} <small style="font-weight: bold">{o.market.split( "/" )[ 1 ]}</small></td>
          <td>{o.amount} <small style="font-weight: bold">{o.market.split( "/" )[ 0 ]}</small></td>
          <td>{o.total} <small style="font-weight: bold">{o.market.split( "/" )[ 1 ]}</small></td>
        </tr>
      {/each}
      </tbody>
    </table>
    <p>
    {#each w.orders as o,j}
      {j + 1}.
        {#if o.side === "buy"}
          Use {o.total} <small style="font-weight: bold">{o.market.split( "/" )[ 1 ]}</small>
          den dönüştür <b style="color: #02c076">SATIN AL</b> {o.amount} <small style="font-weight: bold">{o.market.split( "/" )[ 0 ]}</small>
          market <a href={o.link} target="_blank">{o.market}</a> @{o.price} <small style="font-weight: bold">{o.market.split( "/" )[ 1 ]}</small>
        {:else}
          <b style="color:#f84960">SAT</b> {o.amount} <small style="font-weight: bold">{o.market.split( "/" )[ 0 ]}</small>
          den dönüştür {o.total} <small style="font-weight: bold">{o.market.split( "/" )[ 1 ]}</small>
          market <a href={o.link} target="_blank">{o.market}</a> @{o.price} <small style="font-weight: bold">{o.market.split( "/" )[ 1 ]}</small>
        {/if}
      <br />
    {/each}
    <br />
    Toplam kâr (tüm binance ücretlerini hesaba katarak) {w.profit.sub( 1 ).mul( 100 ).toFixed( 4 )}%
    <br />
  </p>
  <hr/>
  </div>
{/each}
