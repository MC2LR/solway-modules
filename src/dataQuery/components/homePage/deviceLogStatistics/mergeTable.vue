<template>
    <div class="mergeTable">
        <table>
            <tr v-for="(v, i) in TableData" :key="i">
                <td>
                  {{v[getkey(v)]}}
                  <!-- {{v.st_name}} -->
                </td>
                <td>
                  <template v-if="getChildren(v)">
                    <merge-table :TableData='children'></merge-table>
                    <!-- <table>
                        <tr v-for="(vv, ii) in children" :key="ii">
                            <td>{{vv.s_start_time}}</td>
                        </tr>
                    </table> -->
                  </template>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: 'mergeTable',
  props: {
    TableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    sortKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    sortValues: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
        thNameMap: {
          1: 'device_type_str',
          2: 'com_name',
          3: 'st_name',
          4: 'device_name',
          5: 'event_type_str',
          6: 's_start_time',
          7: 's_start_time',
          8: 's_start_time'
        },
        children: []
    }
  },
  methods: {
    getChildren (v) {
      for (let i = 0; i < Object.keys(v).length; i++) {
        if (Array.isArray(v[Object.keys(v)[i]])) {
          this.children = v[Object.keys(v)[i]]
          return true
        } else {
          return false
        }
      }
    },
    getkey (v) {
      // var mix = Object.keys(v).find((vv, ii) => {
      //   return !Array.isArray(v[vv]) && this.sortValues.includes(vv)
      // })
      // console.log(mix)
      // for (let i = 0; i < Object.keys(v).length; i++) {
      //   if (!Array.isArray(v[Object.keys(v)[i]])) {
      //     for (let j = 0; j < this.sortValues.length; j++) {
      //       if (Object.keys(v).includes(this.sortValues[j])) {
      //         return this.sortValues[j]
      //       }
      //     }
      //   }
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.mergeTable {
  table {
    td {
      border: 1px solid #000;
    }
  }
}
</style>
