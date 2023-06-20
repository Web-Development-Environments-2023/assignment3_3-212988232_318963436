<template>
  <div class="container">
    <div class="myTitle">
      <h1>mi familia</h1>
    </div>

    <div v-if="myFamilieswithMembers.length == 0">
      <p>You are not in any family.</p>
      <p>Click the button below to create or join a family.</p>
    </div>
    <div class="button-container">
      <button @click="openSearchModal" class="button-74">Search Family</button>
      <button @click="openCreateModal" class="button-74">Create Family</button>
    </div>

    <b-modal v-model="showSearchModal" title="Search Family">
      <div>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter family name"
        />
        <button @click="searchFamily" class="button-74">Search</button>

        <table v-if="searchResults.length > 0" class="search-results-table">
          <thead>
            <tr>
              <th>Family Name</th>

              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in searchResults" :key="result.family_id">
              <td>{{ result.name }}</td>

              <td>
                <button @click="addFamily(result, true)" class="button-74">Join</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No results found.</p>
      </div>
    </b-modal>

    <b-modal v-model="showCreateModal" title="Create Family">
      <form @submit.prevent="createFamily">
        <label for="familyLastName">Family Name:</label>
        <input
          type="text"
          id="familyLastName"
          v-model="newFamily.Family_name"
          placeholder="Enter Family Name"
          required
        />
        <button type="submit" >Create</button>
      </form>
    </b-modal>

    <table class="family-table">
      <thead>
        <tr>
          <th>Family Name</th>
          <th>Number of Participants</th>
        </tr>
      </thead>
      <tbody>
        <div
          v-for="family in myFamilieswithMembers"
          :key="family.family.family_id"
        >
          <tr>
            <td>
              <button @click="toggleFamilyMembers(family)" >
                {{ family.showMembers ? "v" : "^" }}
              </button>
              <router-link
                :to="{
                  name: 'familyRecipes',
                  params: { id: family.family.family_id },
                }"
              >
                {{ family.family.name }}
              </router-link>
            </td>
            <td>{{ family.members.length }}</td>
          </tr>
          <tr v-if="family.showMembers">
            <td colspan="2">
              <table class="sub-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in family.members" :key="member.username">
                    <td>{{ member.username }}</td>
                    <td>{{ member.firstname }} {{ member.lastname }}</td>
                    <td>{{ member.email }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "FamilyPage",
  components: {},
  data() {
    return {
      myFamilieswithMembers: [],
      showSearchModal: false,
      showCreateModal: false,
      searchQuery: "",
      searchResults: [],
      newFamily: {
        Family_name: "",
      },
    };
  },
  methods: {
    async toggleFamilyMembers(family) {
      console.log("toggleFamilyMembers", family);
      family.showMembers = !family.showMembers;
    },
    openSearchModal() {
      this.showSearchModal = true;
    },

    openCreateModal() {
      this.showCreateModal = true;
    },
    async searchFamily() {
      try {
        // Perform the search request using the searchQuery value
        const response = await this.$store.dispatch("searchFamily", {
          query: this.searchQuery,
        });
        if (response.status === 200) {
          this.searchResults = response.data;
        } else {
          this.searchResults = [];
        }
      } catch (error) {
        console.error(error);
        this.searchResults = [];
      }
    },

    async addFamily(family, isAdd) {
      // Implement the logic to add the selected family to the list of "myFamilies" or perform any other desired action
      try {
        this.showSearchModal = false;
        const response = await this.$store.dispatch("joinFamily", {
          familyId: family.family_id,
          isAdd: isAdd,
        });
        if (response.status === 204) {
          this.$root.toast(
            "Search Family",
            "successfully to the family",
            "success"
          );
        } else {
          this.$root.toast(
            "Search Family",
            "failed to add to the family",
            "danger"
          );
        }
        this.updateFamily();
      } catch (error) {
        this.$root.toast(
          "Search Family",
          "failed to add to the family",
          "danger"
        );
        this.searchResults = [];
      }
    },
    async createFamily() {
      // Implement the logic to create a new family
      // Close the modal after creating the family
      try {
        this.showCreateModal = false;
        const response = await this.$store.dispatch("createFamily", {
          family_name: this.newFamily.Family_name,
        });
        if (response.status === 201) {
          this.$root.toast(
            "Create Family",
            "successfully created the family",
            "success"
          );
        } else {
          this.$root.toast(
            "Create Family",
            "failed to create the family",
            "danger"
          );
          this.newFamily.Family_name = "";
        }
        this.updateFamily();
      } catch (error) {
        console.error(error);
        this.$root.toast(
          "Create Family",
          "failed to create the family",
          "danger"
        );
        // Reset the form fields
        this.this.newFamily.lastName = "";
      }
    },
    async updateFamily() {
      try {
        this.myFamilieswithMembers = [];
        let response = await this.$store.dispatch("myFamilies");
        if (!response.status == 200) {
          this.$router.push("/");
          return;
        }
        this.myFamilies = response.data;
        if (this.myFamilies.length > 0) {
          this.myFamilies.map(async (family) => {
            let response = await this.$store.dispatch("getFamilyMembers", {
              familyId: family.family_id,
            });
            if (response.status == 200 && response.data.length > 0) {
              this.myFamilieswithMembers.push({
                family: family,
                members: response.data,
                showMembers: false,
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    this.updateFamily();
  },
};
</script>

<style scoped>
.family-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.family-table {
  margin-top: 20px;
  border-collapse: collapse;
  font-size: 18px;
  width: 70%;
  max-width: 800px;
}

.family-table th,
.family-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.sub-table {
  margin-top: 10px;
  border-collapse: collapse;
  font-size: 16px;
  width: 70%;
  max-width: 800px;
}

.sub-table th,
.sub-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}
</style>
