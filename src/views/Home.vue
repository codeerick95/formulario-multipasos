<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <!-- <form-register :currentViewForm="currentView" class="mt-5"></form-register> -->
        <new-form :currentViewForm="1" class="mt-5"></new-form>
      </div>
      <!-- <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'



// import FormRegister from '@/components/FormRegister.vue'
import NewForm from '@/components/NewForm.vue'

export default {
  name: 'Home',
  components: {
    // FormRegister,
    NewForm
  },
  data() {
    return {
      currentView: 1
    }
  },
  computed: {
    
  },
  methods: {
    setCheck(value) {
      if(value === 1) {
        this.step1.value = false
        this.step1.disabled = false
        this.currentView = value
      } else if(value === 2 && this.currentView > 1 || value === 2 && this.step1.completed) {
        this.step2.value = false
        this.step2.disabled = false
        this.currentView = value
      } else if(value === 3 && this.currentView > 2 || value === 3 && this.step2.completed) {
        this.step3.value = false
        this.step3.disabled = false
        this.currentView = value
      } else if(value === 4 && this.currentView > 3 || value === 4 && this.step3.completed) {
        this.step4.value = false
        this.step4.disabled = false
        this.currentView = value
      } else if(value === 5 && this.currentView > 4 || value === 5 && this.step4.completed) {
        this.step5.value = false
        this.step5.disabled = false
        this.currentView = value
      }
    }
  }
}
</script>

<style lang="scss">

select,
input.form-control,
input.custom-control-input {
  box-shadow: none !important;
  outline: none !important;
}

.custom-control-label {
  cursor: pointer;
  &::before {
    border-radius: 50% !important;
    background-color: #e63629 !important;

  }
}
</style>
