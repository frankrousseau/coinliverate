<template>
  <div class="main has-text-centered">
    <h1 class="title">Cryptocurrency price</h1>
    <table class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change 1h</th>
          <th>Change 24h</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results">
          <td>{{ result.name }}</td>
          <td>{{ result.symbol }}</td>
          <td class="has-text-right">
            {{ Math.floor(result.price_eur * 100) / 100}}
          </td>
          <td :class="{
            'has-text-right': true,
            'has-text-success': result.percent_change_1h > 0,
            'has-text-danger': result.percent_change_1h < 0
          }">
            {{ result.percent_change_1h > 0 ? '+ ' + result.percent_change_1h : result.percent_change_1h }}
          </td>
          <td :class="{
            'has-text-right': true,
            'has-text-success': result.percent_change_24h > 0,
            'has-text-danger': result.percent_change_24h < 0
          }">
            {{ result.percent_change_24h > 0 ? '+ ' + result.percent_change_24h : result.percent_change_24h }}
          </td>
        </tr>
      </tbody>
    </table>
    <template slot-scope="props">
    aauie
    <b-table
			:data="results"
			:striped="true"
			:hoverable="true"
			:loading="results.length > 0"
			:mobile-cards="true">

      {{ props }}
      {{ props.row }}
			<b-table-column label="Name" width="200" numeric>
				{{ props.row.name }}
			</b-table-column>

			<b-table-column label="Symbol">
				{{ props.row.symbol }}
			</b-table-column>

			<b-table-column label="Price (EUR)">
				{{ props.row.price_eur }}
			</b-table-column>

			<b-table-column label="Change 1h" centered>
				{{ props.row.percent_change_1h }}
			</b-table-column>

			<b-table-column label="Gender">
				{{ props.row.percent_change_24h }}
			</b-table-column>
    </b-table>
    </template>
    <p>Powered by <a href="https://etherpool.fr">Etherpool</a></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Table, TableColumn } from 'buefy'

export default {
  name: 'Welcome',
  components: {
    Table,
    TableColumn
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters([
      'results'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  margin: auto;
}
</style>
