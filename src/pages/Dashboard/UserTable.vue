<template>
    <base-table :data="table.data"
                :columns="table.columns"
                thead-classes="text-primary">
    </base-table>
</template>
<script>
    import { BaseTable } from "@/components";
    export default {
        components: {
            BaseTable
        },
        computed: {
            table(){
                var data={
                    "title": "Simple Table",
                    "columns": [
                        "Name",
                        "Country",
                        "City",
                        "Salary"
                    ],
                    "data": [
                        {
                            "id": 1,
                            "name": "Dakota Rice",
                            "salary": "$36.738",
                            "country": "Niger",
                            "city": "Oud-Turnhout"
                        },
                        {
                            "id": 2,
                            "name": "Minerva Hooper",
                            "salary": "$23,789",
                            "country": "Curaçao",
                            "city": "Sinaai-Waas"
                        },
                        {
                            "id": 3,
                            "name": "Sage Rodriguez",
                            "salary": "$56,142",
                            "country": "Netherlands",
                            "city": "Baileux"
                        },
                        {
                            "id": 4,
                            "name": "Philip Chaney",
                            "salary": "$38,735",
                            "country": "Korea, South",
                            "city": "Overland Park"
                        },
                        {
                            "id": 5,
                            "name": "Doris Greene",
                            "salary": "$63,542",
                            "country": "Malawi",
                            "city": "Feldkirchen in Kärnten"
                        },
                        {
                            "id": 6,
                            "name": "Mason Porter",
                            "salary": "$98,615",
                            "country": "Chile",
                            "city": "Gloucester"
                        },
                        {
                            "id": 7,
                            "name": "Jon Porter",
                            "salary": "$78,615",
                            "country": "Portugal",
                            "city": "Gloucester"
                        }
                    ]
                };
                return data;
            }
        }
    }
</script>
<style>
</style>
