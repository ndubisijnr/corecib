<template>
  <div>
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col">
          <div class="no-data text-center ">
            <div  class="empty-history">
              <span >
                <svg
                  
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                >
                  <circle  cx="25" cy="25" r="25"></circle>
                  <line
                    
                    x1="25"
                    y1="10"
                    x2="25"
                    y2="32"
                    class="a"
                  ></line>
                  <line
                    
                    x1="25"
                    y1="37"
                    x2="25"
                    y2="39"
                    class="a"
                  ></line></svg
              ></span>
             </div>
            <h3>Payment Pages</h3>
            <p>
              The easiest way to accept payments. Simply create a page, share
              the link to your customers and start accepting payments.
              <br /><br />
              <base-button type="primary">
  <i class="fa fa-plus "></i>New Page
  </base-button>
              
            </p>
            <!--<p>
              There're no pages for this query. Please try another query or
              clear your filters.
            </p>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
    
  },
};
</script>
<style scoped>
.no-data {
    width: 500px;
    max-width: 90%;
    margin: 40px auto;
}
.no-data p {
    margin: 0 auto 10px;
    max-width: 450px;
    line-height: 1.4;
}
.empty-history {
  height: 100px;
  width: 100%;
  padding: 10px 10px;
}
.empty-history span {
  display: block;
  margin-bottom: 7px;
}
.empty-history span svg {
  /* fill: #6e0400; */
  height: 30px;
  width: 30px;
  margin: 0 auto;
  display: block;
}
svg {
  overflow: hidden;
  vertical-align: middle;
}
.empty-history span svg circle {
  fill: #ca0305;
  /* fill: #EFCE4A; */
}
.empty-history span svg line {
  fill: none;
  stroke-width: 2;
  stroke: #fff;
}
</style>