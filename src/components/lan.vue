<template>
    <tbody class="kommunerWrapper" >
                    <template v-for="(data,index) in selectedLanData">
                        <tr v-if="data.key[1] ==='1'" :key="index">
                            <th class="kommunerItem kommun">{{data.key[0]}}</th>
                            <th class="kommunerItem sex" >Män</th>
                            <th class="kommunerItem numbers">{{data.values[0]}}</th>
                            <th class="kommunerItem numbers">{{data.key[2]}}</th>
                        </tr>
                        <tr v-else :key="index">
                            <th class="kommunerItem kommun">{{data.key[0]}}</th>
                            <th class="kommunerItem sex" >Kvinnor</th>
                            <th class="kommunerItem numbers">{{data.values[0]}}</th>
                            <th class="kommunerItem numbers">{{data.key[2]}}</th>
                        </tr>
                    </template>
                </tbody>
</template>


<script>
import dataStore from '../modules/dataHandler';

export default {
    data:()=>{
        return{
            myData:[],
            selectedLanData:[]
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
