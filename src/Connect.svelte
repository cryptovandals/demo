<script lang="typescript">
  import { connect } from "./state";
</script>

<style>
  img {
    width: 100%;
  }
  section {
    text-align: center;
  }
  h1 {
    display: none;
  }
</style>

<div class="fullpage">
  <section>
    <h1>CryptoVandals</h1>
    <img src="./images/header.png" alt="CryptoVandals logo" />
    <button class="button-shadow" on:click={connect}
      ><span>Connect your wallet</span></button
    >
    <br />
    <a href="https://github.com/cryptovandals/contracts">About CryptoVandals</a>
  </section>
</div>
