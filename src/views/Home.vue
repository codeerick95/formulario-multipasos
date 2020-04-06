<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <form-register class="mt-5"></form-register>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'



// import FormRegister from '@/components/FormRegister.vue'
import FormRegister from '@/components/FormRegister.vue'

export default {
  name: 'Home',
  components: {
    FormRegister
  },
  data() {
    return {
    }
  },
  computed: {
    
  },
  methods: {
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
