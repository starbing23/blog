<template>
  <div class="works">
      <div class="works-container">
          <div class="work-container">
                <div><h3>AgencyCore - Axxess</h3></div>
                <p class="description">Subversively recreated multiple key features for AngecyCore, which is the core production in Axxess.</p>
                <div class="row">
                    <div class="col-md-6" style="text-align: left;">
                        <div style="margin-bottom: 10px;"><img src="../img/patient-chart.png" alt="profile-header" width="100%"></div>
                        <div><strong>Independently design and create patient form, which handle all the patients' information</strong></div>
                        <div>Validation system can handle all kinds of errors and require validation</div>
                        <div>Tab system classify data in a huge form and notification system help user to identify error</div>
                    </div>
                    <div class="col-md-6" style="text-align: left;">
                        <div class="row" style="margin-bottom: 20px;">
                            <div class="col-md-6"><img src="../img/plan-of-care.png" alt="profile-header" width="100%"></div>
                            <div class="col-md-6">
                                <div><strong>Create plan of care page independently</strong></div>
                                <div>Reusable components obviously increate efficiency for front-end team</div>
                                <div>Import VueJS and webpack to an exist old production is a big challenge but worth to do so. It increases lots of performance and is easier to maintenance</div>
                            </div>
                        </div>
                        <div class="row">
                            <div style="margin-bottom: 10px;" class="col-md-6"><img src="../img/order.png" alt="profile-header" width="100%"></div>
                            <div class="col-md-6">
                                <div><strong>ReCreated order form and so on</strong></div>
                                <div></div>
                                <div>Import VueJS and webpack to an exist and old production is a big challenge but worth to do so. It increases lots of performance and is easier to maintenance</div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Works',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.works {
    width:100%;
    min-height: calc(100% - 72px);
    background: #f5f5f5;
    overflow: auto;

    .work-container {
        width: 90%;
        background: white;
        overflow: hidden;
        margin: 30px auto;
        box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2);
        padding: 30px;

        .description {
            color: rgba(0, 0, 0, 0.55);
        }
    }
}
</style>
