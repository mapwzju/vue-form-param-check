<template>
  <div>
   <div>
    <label class="star">Name:</label>
     <input class='v-check' v-checkParam="{required:true,regex:'^[abcde]*$'}" type="text">
   </div>
   <div>
    <label class="star">IP:</label>
     <input class='v-check' v-checkParam="{required:true,regex:'IpRegex'}"
     type="text">
     </div>
    <div>
      <button v-checkSubmit v-on:click="submit">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'demo',
  methods: {
    submit () {
     // alert('通过校验')
    }
  }
}
</script>

<style scoped>
input{
	height: 22px;
}
.input-error{
 background-color: red;
}
.star:before
{
  content:"*";
  color:red;
}
</style>

