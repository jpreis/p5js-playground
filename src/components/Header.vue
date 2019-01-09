<template>
  <header class="p5p-header">
    <div class="container">
      <div class="column is-10 is-offset-1">
        <h1 class="title is-3">
          p5.js Playground
        </h1>
        <p>
          <a href="https://p5js.org/">p5.js</a> is a library which, at its core, provides a simple API for drawing to a <code>
            canvas</code> element. It was inspired by the <a href="http://processing.org">Processing</a> project.
        </p>
        <p>
          Having used Processing for several years, I'm now trying to make the transition to p5.js since JavaScript is the programming language I'm most confident with and I'm excited by the possibilities of incoprorating the <strike>programs</strike> sketches in the browser.
        </p>
        <p>
          Following the <em>sketchbook</em> metaphor proposed by Processing (which is also used in p5.js), my goal is to quickly try out new ideas - so don't expect highly optimized code. 🛠
        </p>
        <p>
          For performance reasons, all but the first sketch will be set to <code>noLoop()</code> after a short time. Click on a sketch to toggle it active/inactive.
        </p>
        <p>
          If you want to play around with a sketch, I recommend using the <a
            href="https://editor.p5js.org/"
          >p5.js Online Editor</a>. Simply copy and paste the source code and replace the last line <code>export default seed;</code> with <code>new&nbsp;p5(seed);</code> and you're good to go!
        </p>
      </div>
    </div>

  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.p5p-header {
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #f9f9f9;

  code {
    background-color: rgba(0, 0, 0, 0.05);
  }

  p {
    margin-bottom: 1em;
    font-size: 0.8em;
  }

  .title {
    position: relative;
    font-weight: 300;
    color: #ed225d;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
}
</style>
