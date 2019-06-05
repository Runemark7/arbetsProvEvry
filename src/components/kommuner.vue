<template>
    <div class="mainWrapper">

        <div class="wrapperLeft">
            <sweden-map v-on:map-clicked="onMapClick"></sweden-map>
        </div>

        <div class="wrapperRight">
            <h1 class="selctedLan text-center" v-if="this.selectedLan">{{this.selectedLan}}</h1>
            <h1 class="selctedLan text-center" v-else>Välj ett län</h1>
            <table v-if="selectedLan">
                <thead>
                    <tr>
                        <th @click="sort('region')">Kommun</th>
                        <th @click="sort('gender')">Kön</th>
                        <th @click="sort('2013')">2013</th>
                        <th @click="sort('2014')">2014</th>
                        <th @click="sort('2015')">2015</th>
                        <th @click="sort('2016')">2016</th>
                        <th @click="sort('2017')">2017</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(data,index) in sortedKommuner">
                        <tr class="kommunerItemWrapper" :key="index">
                            <th class="kommunerItem" >{{data.region}}</th>
                            <th class="kommunerItem" v-if="data.gender === '1'">Män</th>
                            <th class="kommunerItem" v-else>Kvinnor</th>
                            <th class="kommunerItem" >{{data["2013"]}}</th>
                            <th class="kommunerItem" >{{data["2014"]}}</th>
                            <th class="kommunerItem" >{{data["2015"]}}</th>
                            <th class="kommunerItem" >{{data["2016"]}}</th>
                            <th class="kommunerItem" >{{data["2017"]}}</th>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

    </div>
</template>


<script>

import dataStore from '../modules/dataHandler';
import swedenMap from './swedenMap.vue'

export default {
    components: {
        swedenMap
    },
    data:()=>{
        return{
        currentSort:'region',
        currentSortDir:'asc',

        initData:[],
        selectedLanDataParsed:[],
        lanData:[],
        selectedLan:'',
            
        } 
    }, 
    created:async function() {
        let lanData = await dataStore.methods.getData('http://localhost:5000/lan');

        lanData.forEach(element => {
            this.lanData.push(element);
        });

        let kommunData = await dataStore.methods.getData('http://localhost:5000/kommuner');

        kommunData.forEach(element => {
            this.initData.push(element);
        });
    },
    methods:{
        onMapClick: function(attr){
            this.selectedLan = attr.title;
            this.getLanData(attr.title);
        },
        getLanData(selectedName){
            let selectedLanData = [];
            this.selectedLanDataParsed = [];
            let ids = [];

            this.lanData.forEach(element => {
                if(element.name == selectedName){
                    element.ids.forEach(el => {
                        ids.push(el)
                    });
                }
            });
            
            let arr2 = this.initData;
            arr2.forEach(e1 => ids.forEach(e2 => 
                { if(e1.key[0] === e2){
                    selectedLanData.push(e1);
                }}
            ));

            const source = selectedLanData;
            const tableRows  = source.reduce((rows, value) => {
            let currentRow = rows.find(row => row.region === value.key[0] && row.gender === value.key[1]);
            if (!currentRow) {
                currentRow = {region: value.key[0], gender: value.key[1]};
                rows.push(currentRow);
            }
            currentRow[value.key[2]] = parseInt(value.values[0]);
            return rows;
            }, []);

            tableRows.forEach(element => {
                this.selectedLanDataParsed.push(element);
            });
        },
         
        sort(s) {
        if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
        }
    },
    computed:{
        sortedKommuner(){
            let data = this.selectedLanDataParsed;
            return data.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc')
                {
                    modifier = -1;
                }
                if(a[this.currentSort] < b[this.currentSort])
                {
                    return -1 * modifier;
                } 
                if(a[this.currentSort] > b[this.currentSort])
                {
                    return 1 * modifier;
                }
                return 0;
            });
        },
    }
}
</script>

<style scoped lang="scss">
@media only screen and (max-width: 600px) {
 .mainWrapper{
    height:auto;
    font-family: sans-serif;
    width:100%;
    padding:5px;
    .text-center{
        text-align:center;
    }

    .wrapperLeft{
        width:100%;
    }
    
    .wrapperRight{
        width:100%;
        table{

            -webkit-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
            -o-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
            -ms-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
            border-collapse: collapse;
            border:1px solid black;
            width:100%;
            margin:auto;
            tr,th{
                overflow: hidden;
                padding:2px;
            }
                
            thead{
                background-color:black;
                tr{
                    height:25px;
                    th{
                        padding:3px;
                        color:white;
                        font-size:14px;
                        font-weight: 600;
                    }
                }
                
            }
            tbody tr:nth-child(odd){
                background-color: #f2f2f24f;
            }
            tr,th{
                text-align: left;
                border:1px solid black;
            }
            tbody{
                tr{
                    th{
                        padding:3px;
                        font-size:14px;
                        padding-top:1px;
                        padding-bottom:1px;
                    }
                }
            }
        }
    }
} 
}
@media(min-width:768px)
{
    .mainWrapper{
    font-family: sans-serif;
    display:flex;
    width:100%;
    padding:30px;
    .text-center{
        text-align:center;
    }
 

    .wrapperLeft{
        width:30%;
    }
    
    .wrapperRight{
        width:70%;
        
        table{
            
            border-collapse: collapse;
            border:1px solid black;
            width:95%;
            margin:auto;
            tr,th{
                padding:10px;
            }
                
            thead{
                background-color:black;
                tr{
                    height:50px;
                    th{
                        color:white;
                        font-size:24px;
                    }
                }
                
            }
            tbody tr:nth-child(odd){
                background-color: #f2f2f2;
            }
            tbody tr:hover{
                background-color: #ddd;
            }
            tr,th{
                  text-align: left;
                border:1px solid black;
            }
            tbody{
                tr{
                    th{
                        padding-top:5px;
                        padding-bottom:5px;
                    }
                }
            }
        }
    }
}   
}


</style>
