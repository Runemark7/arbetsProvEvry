<div>
</div>

<script>
import dataStore from '../modules/dataHandler';

export default {
    data:()=>{
        return{
            headers: [
                {
                    text: 'Kommun',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Kön', value: 'xd' },
                { text: 'Antal', value: 'carbs' },
                { text: 'Year', value: 'iron' }
            ],
            myData:[],
        } 
    },
    methods:{
 
    },
    async created(){
        let datan = await dataStore.methods.getData('http://localhost:5000/lan');

        datan.forEach(element => {
            this.myData.push(element);
        });
        
    }
}
</script>

<style scoped lang="scss">

</style>
