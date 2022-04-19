import ApikeyService from "../../service/ApikeyService";

export const state = {
  token: null,
  loading:false,
  success:"",
  error: "",
  readApikey: {},
  response:{}
}

export const getters = {
  UserToken: state => {
    // console.log("getter getTok")
    return localStorage.getItem('token')
  },


}

export const mutations = {

  updateToken: (state, payload) => {
    state.token = payload
  },
  updateLoading: (state, payload) => {
    state.token = payload
  },
  updateReadApikey: (state, payload) => {
    state.readApikey = payload
  },
  updateSuccess: (state, payload) => {
    state.success= payload
  },
  updateError: (state, payload) => {
    state.errors = payload
  },
  updateResponse: (state, payload) => {
    state.response = payload
  },

}

export const actions = {

  readApiKey:({commit, dispatch, rootState}, payload) =>{
    commit("updateLoading", true)
    commit("updateSuccess", "")
    commit("updateError", "")
    commit("updateReadApikey", {})

    return ApikeyService.callReadApiKey(payload).then(response => {
      let responseData = response.data
      commit("updateLoading",false)
      commit("updateResponse", responseData)
      if(responseData.responseCode === "00"){
        commit("updateResponse", responseData.responseMessage)
        commit("updateReadApikey", responseData.data)
        console.log(state.readApikey)
      }
      else if(responseData.responseCode === "0P"){
        commit("updateLoading",false)
        commit("updateError", responseData.responseMessage)
        console.log(responseData.responseMessage)
      }
      else{
        commit("updateLoading", false)
        commit("updateError", responseData.responseMessage)
        console.log(responseData.responseMessage)
      }
    })
      .catch(error => {
        commit("updateError", error)
        console.log(error)
      })

},

}


export default {
  state,
  actions,
  mutations,
  getters
};

