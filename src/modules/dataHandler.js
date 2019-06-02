const dataStore = {
    data:{
    },
    methods:{
        async getData(url)
        {
            let data = await fetch(url);
            data = await data.json();
            return data;
        },
        async getDataWithId(id)
        {
            alert(id);
            let data = await fetch(`http://localhost:5000/`);
            data = await data.json();
            return data;
        },
        
    }
};

export default dataStore;