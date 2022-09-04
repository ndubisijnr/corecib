<template>
    <b-modal id="image-upload-modal" :hide-backdrop="true" :hide-header="true" :hide-footer="true" :centered="true" ref="image-upload-modal">
        <div class="modal-body">
            <a href="#" role="button" class="close pos-absolute t-15 r-15" data-dismiss="modal" aria-label="Close"
               @click="hide()">
                <span aria-hidden="true">&times;</span>
            </a>
            <div>
                <h4>Upload Your ID</h4>
<!--                <p class="tx-color-03">Upload file for processing</p>-->
                <b-form @submit.prevent="" enctype="multipart/form-data">
                    <b-form-group>
                        <div class="dropbox" :style="{backgroundColor:primaryColor, color:'white'}">
                            <input multiple type="file" class="input-file" id="files" accept="image/*" :name="file.uploadFieldName"
                                   :disabled="isLoading"
                                   @change="uploadFile" ref="file">
                            <p v-if="!isLoading">
                                Drag your file(s) here to begin<br> or click to browse
                            </p>
                          <div v-if="isLoading" style="height:30vh;display: flex;align-items: center;justify-content: center;flex-direction: column">
                            <span>Uploading files...</span>
                            <span class="spinner-border spinner-border-sm"></span>
                          </div>

                        </div>
                    </b-form-group>
                </b-form>
            </div>
        </div><!-- modal-body -->
    </b-modal>
</template>

<script>
    import {mapState} from 'vuex'
    import StoreUtils from "@/util/baseUtils/StoreUtils";


    export default {
        name: 'Loan',
        props:['uploadType','readType','isLoading','uploadData','readData','fileName','directorType','show'],
        data() {
            return {
                primaryColor:window.__env.app.primaryColor,
                model:{
                    base64: '',
                    username: '',
                    region: 'us-east-1',
                    source: "quickgem",
                    s3bucket: 'quikgem-repo'
                },
                file: {
                    accountnumber: '',
                    file: '',
                    amount: '',
                    status: false,
                    bank: {},
                    narration: '',
                    uploadedFiles: [],
                    uploadError: null,
                    currentStatus: null,
                    uploadFieldName: 'photos',
                },
            }
        },
        components: {},
        computed: {
            grades(){
                return  this.grade.grades
            },
            authobj: function () {
                return this.$store.state.auth.response
            },
            ...mapState([
                'grade',
                'auth'
            ]),
          ...mapState({

          })
        },
        methods: {
           uploadFile(event) {
               this.handleUpload(event)
            },

            async handleUpload(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                try {
                    reader.onload = async e => {
                        this.model.base64 = e.target.result
                        this.model.directorType = this.directorType
                        this.model.username = this.fileName+"-"+StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization).organisationName.replace(" ","-").toLowerCase()
                        await this.$store.dispatch(this.uploadType, this.model);
                        this.hide();
                        this.loadData();
                    };
                  reader.readAsDataURL(file);
                    this.$emit('input', file);
                } catch (e) {
                    console.warn(e.message)
                }
            },

            loadData(){
                this.$store.dispatch(this.readType, this.readData, {root: false}).then()
            },
            hide() {
                this.$refs['image-upload-modal'].hide()
            },
            onSelect({name, iso2, dialCode}) {
                this.model.employeeCountryCode =  dialCode
            },
            numberWithCommas(x) {
                let parts = x.toString().split(".");
                if (parts[1] == null)  parts[1] = '00'
                else if (parts[1].length === 0) parts[1] = parts[1]+'00'
                else if (parts[1].length === 1) parts[1] = parts[1]+'0'
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            },
        },
        created() {
            this.loadData()
        },
        watch: {
            show: function () {
                let self = this;
                // eslint-disable-next-line no-unused-vars
                Object.keys(this.uploadData).forEach(function(key,index) {
                    self.model[key] = self.uploadData[key];
                });
                this.$refs['image-upload-modal'].show()
            }
        },
      mounted() {
          console.clear()
      }
    }


</script>

<style scoped>
    .dropbox {
        /*outline: 2px dashed grey; !* the dash box *!*/
        /*outline-offset: -10px;*/
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: pointer;
    }

    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }
    .spinner-border {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      vertical-align: text-bottom;
      border: 0.25em solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      -webkit-animation: spinner-border 0.75s linear infinite;
      animation: spinner-border 0.75s linear infinite;
    }


    @keyframes spinner-border {
      to {
        transform: rotate(360deg);
      }
    }

</style>
