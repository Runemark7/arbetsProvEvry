<template>
    <div :id="svgId" class="svg-container"></div>
</template>
<script>

    import swedenMap from "../assets/swedenMap"
    export default {
        name: "swedenMap",
        data: function () {
            return {
                svgId: "swedenMap",
                mapAttr: {
                    viewBoxWidth: 1106,
                    viewBoxHeight: 2000,
                    imageWidth: 1106,
                    imageHeight: 500,
                },
                svgContainer: null
            }
        },
        mounted: function () {
            this.generateVenueMap()
        },
        methods: {
            generateVenueMap: function () {
                const vue = this;
                const mapData = swedenMap.g.path
                const svgContainer = vue.$svg("swedenMap").size('100%', '100%').viewbox(-200, 0, vue.mapAttr.viewBoxWidth, vue.mapAttr.viewBoxHeight);
                vue.svgContainer = svgContainer;
                mapData.forEach((pathObj) => {
                    vue.generatePath(svgContainer, pathObj);
                })
            },
            generatePath: function (svgCont, pathObj) {
                const vue = this;
                
                const attrs = {
                    'fill': "#8470ff",
                    'stroke': "white",
                    'stroke-width': 2,
                    'title': pathObj["-title"],
                    'map-id': pathObj["-id"],
                };
                const element = svgCont.path(pathObj["-d"]).attr(attrs);
                element.click(function () {
                    const mapId = this.node.attributes["map-id"].value;
                    const title = this.node.attributes["title"].value;
                    vue.$emit("map-clicked", {mapId, title});
                })
                
            }
        }

    }
</script>
