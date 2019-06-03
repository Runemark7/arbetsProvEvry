<template>
    
</template>


<script>
import dataStore from '../modules/dataHandler';

export default {
    data:()=>{
        return{
            myData:[],
        } 
    },
    methods:{
 
    },
    async created(){
        let datan = await dataStore.methods.getData('http://localhost:5000/kommuner');

        datan.forEach(element => {
            this.myData.push(element);
        });
        
    }
}
</script>

<style scoped lang="scss">

</style>
