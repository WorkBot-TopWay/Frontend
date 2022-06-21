<template>
<div class="container">
  <Toolbar>
    <template #start>
      <Button
        label="Edit feature"
        icon="pi pi-pencil"
        class="p-button-success mr-2"
        @click="openEditInformation()"
      />
      <Button
        label="Add competence"
        icon="pi pi-plus"
        class="p-button-warning mr-2"
        @click="openAddCompetence()"
      />
      <Button
        label="Add news"
        icon="pi pi-plus"
        class="p-button-raised mr-2"
        @click="openAddNews()"
      />
      <Button
        label="Add images"
        icon="pi pi-plus"
        class="p-button-raised p-button-help mr-2"
        @click="openAddImages()"
      />
    </template>
    <template #end>
      <Button
        label="Select category"
        icon="pi pi-plus"
        class="p-button-warning mr-2"
        @click="openAddCategory()"/>
    </template>
  </Toolbar>
  <div class="container-all flex flex-row" style="width: 100%">
    <div class="First-container" style="width: 60%">
      <h1 class="font text-xl font-semibold text-center">Booking section for competitions</h1>
      <div class="secction competition" v-if="!nameCompetition.length==0">
      <div class="flex align-items-center justify-content-center mb-3">
        <Button
          label="Edit competition"
          icon="pi pi-plus"
          class="p-button-raised mr-2"
          @click="openEditCompetence()"/>
        <Dropdown
          inputId="class"
          v-model="nameSelected"
          :options="nameCompetition"
          optionLabel="name"
          placeholder="Select a type"
          style="width: 14rem; height: 2.5rem"
        />
        <Button
          label="Select"
          class="p-button-success ml-2 mr-2"
          style="height: 2.5rem; width: 8rem"
          @click="activeReservationList()"
        />
        <Button
          label="Rate the competition"
          icon="pi pi-plus"
          class="p-button-raised mr-2"
          @click="rateCompetition()"
        />
      </div>
      <DataTable
        :value="userCompetition"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll"
      >
        <template #header>
          <h3 class=" font text-center" >{{ nameSelected.name }}</h3>
        </template>
        <Column field="url_photo" header="Photo" style="min-width: 1rem">
          <template #body="slotProps">
            <Avatar
              class="flex align-content-center justify-content-center m-2"
              :image="slotProps.data.urlPhoto"
              size="large"
              shape="circle"
            />
          </template>
        </Column>
        <Column header="Name" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span
            >{{ slotProps.data.firstName }}
              {{ slotProps.data.lastName }}</span
            >
          </template>
        </Column>
        <Column header="District" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.district }}</span>
          </template>
        </Column>
      </DataTable>
      </div>
      <div class="secction competition" v-else>
        <h1 class="font text-center text-base font-semibold">No competitions</h1>
      </div>
    </div>
    <div class="Second-container flex justify-content-start align-items-center flex-column" style="width: 40%">
      <h1 class="font text-xl font-semibold text-center">Comments</h1>
      <div  style="width: 80%">
        <div
          v-if="informationObject(comments)"
          class="
                flex
                align-content-start
                justify-content-center
                flex-column
              "
          style="width: 80%"
        >
          <div class="mt-3 ml-3" v-for="data of comments" :key="data" style="width: 100%">
            <div class="flex align-content-start justify-content-start" style="width: 100%">
              <Avatar
                class="flex align-content-center justify-content-center m-2"
                :image="data.user.urlPhoto"
                size="large"
                shape="circle"
              />
              <span
                class="font flex align-items-center justify-content-center"
              >{{ data.user.firstName }} {{ data.user.lastName }}</span
              >
              <Rating
                class="ml-3 flex align-items-center justify-content-center"
                v-model="data.score"
                :cancel="false"
              />
            </div>
            <div
              class="
                    flex
                    align-content-start
                    justify-content-start
                    ml-7
                    flex-column
                  "
            >
              <span class="font">{{ data.description }}</span>
              <span class="font mt-1">[published]: {{ data.date }}</span>
            </div>
          </div>
        </div>

        <div v-else>
          <p class="font text-center text-base font-semibold">
            Does not contain comments
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Feature -->
  <Dialog
    header="Edit Information"
    v-model:visible="isOpenEditInformation"
    :style="{ width: '700px' }"
    :modal="true"
  >
    <div
      class="
          stepsdemo-content
          flex
          justify-content-center
          align-items-center
          bg-black-alpha-10
      "
    >
      <Card class="col-12 md:col-6 lg:col-10">
        <template v-slot:title> Enter your Climbing Gym information </template>
        <template v-slot:content>
          <div class="p-fluid">
            <!-- type climb -->
            <div class="field">
              <label for="description">Type climb</label>
              <InputText id="name_league" v-model="newFeature.typeClimb" />
            </div>
            <!-- office hours start -->
            <div class="field">
              <label for="description">Office hours start</label>
              <InputText id="url_photo" v-model="newFeature.officeHoursStart" />
            </div>
            <!--  office hours end -->
            <div class="field">
              <label for="description">Office hours end</label>
              <InputText id="description" v-model="newFeature.officeHoursEnd" />
            </div>
            <!--  routes -->
            <div class="field">
              <label for="description">Routes</label>
              <InputNumber id="description" v-model="newFeature.routes" />
            </div>
            <!--  Max height -->
            <div class="field">
              <label for="description">Max height</label>
              <InputNumber id="description" v-model="newFeature.maxHeight" />
            </div>
            <!--  Rock type -->
            <div class="field">
              <label for="description">Rock type</label>
              <InputText id="description" v-model="newFeature.rockType" />
            </div>
            <!--  Bolting -->
            <div class="field">
              <label for="description">Bolting</label>
              <InputText id="description" v-model="newFeature.bolting" />
            </div>
            <!--  Price  -->
            <div class="field">
              <label for="description">Price</label>
              <InputNumber id="description" v-model="newFeature.price" />
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="grid grid-nogutter justify-content-end">
            <i></i>
            <Button
              label="Cancel"
              class="p-button-danger"
              @click="closeEditInformation()"
              icon="pi pi-angle-left"
            />
            <Button
              label="Accept"
              class="p-button-success ml-3"
              @click="saveEditFeatureForm"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </div>
  </Dialog>
  <!-- Add Competence -->
  <Dialog
    header="Add Competence"
    v-model:visible="isOpenAddCompetence"
    :style="{ width: '700px' }"
    :modal="true"
  >

    <div
      class="
          stepsdemo-content
          flex
          flex-column
          justify-content-center
          align-items-center
      "
    >
      <Button
        label="Edit Competence"
        class="p-button-warning"
        @click="openDeleteCompetence()"
        icon="pi pi-pencil"
      />
      <Card class="col-12 md:col-6 lg:col-10">
        <template v-slot:title> Enter your competence information </template>
        <template v-slot:content>
          <div class="p-fluid">
            <!-- name -->
            <div class="field">
              <label for="description">Name competence</label>
              <InputText id="description" v-model="newCompetence.name" />
              </div>
            <!-- type -->
            <div class="field">
              <label for="class">Type</label>
              <Dropdown
                inputId="class"
                v-model="selectedType"
                :options="alreadyCategory"
                @change="setType($event)"
                optionLabel="name"
                placeholder="Select a type"
              />
            </div>
            <!--  Price  -->
            <div class="field">
              <label for="description">Price competence</label>
              <InputNumber id="description" v-model="newCompetence.price" />
            </div>
          </div>
        </template>
        <template v-slot:footer>

          <div class="grid grid-nogutter justify-content-end">
            <i></i>
            <Button
              label="Cancel"
              class="p-button-danger"
              @click="closeAddCompetence()"
              icon="pi pi-angle-left"
            />
            <Button
              label="Accept"
              class="p-button-success ml-3"
              @click="saveAddCompetenceForm"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </div>
  </Dialog>
  <!-- Add News -->
  <Dialog
    header="Add News"
    v-model:visible="isOpenAddNews"
    :style="{ width: '700px' }"
    :modal="true"
  >
    <div
      class="
          stepsdemo-content
          flex
          flex-column
          justify-content-center
          align-items-center
      "
    >
      <Button
        label="Edit Competence"
        class="p-button-warning"
        @click="openDeleteNews()"
        icon="pi pi-pencil"
      />
      <Card class="col-12 md:col-6 lg:col-10">
        <template v-slot:title> Enter your news information </template>
        <template v-slot:content>
          <div class="p-fluid">
            <!-- name -->
            <div class="field">
              <label for="description">Title news</label>
              <InputText id="description" v-model="newNews.title" />
            </div>
            <!-- description -->
            <div class="field">
              <label for="description">Description news</label>
              <InputText id="description" v-model="newNews.description" />
            </div>
            <!--  Url Image -->
            <div class="field">
              <label for="description">Url image</label>
              <InputText id="description" v-model="newNews.urlImage" />
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="grid grid-nogutter justify-content-end">
            <i></i>
            <Button
              label="Cancel"
              class="p-button-danger"
              @click="closeAddNews()"
              icon="pi pi-angle-left"
            />
            <Button
              label="Accept"
              class="p-button-success ml-3"
              @click="saveAddNewsForm"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </div>
  </Dialog>
  <!-- Add Image -->
  <Dialog
    header="Add Images"
    v-model:visible="isOpenAddImages"
    :style="{ width: '700px' }"
    :modal="true"
  >
    <div
      class="
          stepsdemo-content
          flex
          flex-column
          justify-content-center
          align-items-center
      "
    >
      <Button
        label="Edit Images"
        class="p-button-warning"
        @click="openDeleteImages()"
        icon="pi pi-pencil"
      />
      <Card class="col-12 md:col-6 lg:col-10">
        <template v-slot:title> Enter your image information </template>
        <template v-slot:content>
          <div class="p-fluid">
            <!-- Url Image -->
            <div class="field">
              <label for="description">Url Image</label>
              <InputText id="description" v-model="newImages.urlImage" />
            </div>
            <!-- alt -->
            <div class="field">
              <label for="description">Alt</label>
              <InputText id="description" v-model="newImages.alt" />
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="grid grid-nogutter justify-content-end">
            <i></i>
            <Button
              label="Cancel"
              class="p-button-danger"
              @click="closeAddImages()"
              icon="pi pi-angle-left"
            />
            <Button
              label="Accept"
              class="p-button-success ml-3"
              @click="saveAddImagesForm"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </div>
  </Dialog>
  <!-- Add Category -->
  <Dialog
    header="Categories"
    v-model:visible="isOpenCategory"
    :style="{ width: '600px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <DataTable
        :value="categories"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll"
      >
        <Column header="Name" sortable style="min-width: 2rem">
          <template #body="slotProps">
              <span
              >{{ slotProps.data.name}}</span
              >
          </template>
        </Column>
        <Column
          header="Actions"
          style="min-width: 2rem">
          <template #body="slotProps">
            <Button
              v-if="!categoryExist(slotProps.data.id)"
              @click="addCategory(slotProps.data.id)"
              label="Add it"
              icon="pi pi-plus"
              class="p-button-raised p-button-help mr-2"
            />
            <Button
              v-else
              @click="deleteCategory(slotProps.data.id)"
              label="Remove"
              icon="pi pi-trash"
              class="p-button-raised p-button-danger"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <template #footer>
      <Button
        label="Ok"
        icon="pi pi-check"
        @click="closeAddCategory"
        class="p-button-text"
      />
    </template>
  </Dialog>
  <!-- Delete Competence -->
  <Dialog
    header="Edit Competence"
    v-model:visible="inOpenDeleteCompetence"
    :style="{ width: '600px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <DataTable
        :value="competences"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll"
      >
        <Column header="Title" sortable style="min-width: 2rem">
          <template #body="slotProps">
              <span
              >{{ slotProps.data.name}}</span
              >
          </template>
        </Column>
        <Column
          header="Actions"
          style="min-width: 2rem">
          <template #body="slotProps">
            <Button
              @click="deleteCompetence(slotProps.data.id)"
              label="Remove"
              icon="pi pi-trash"
              class="p-button-raised p-button-danger"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <template #footer>
      <Button
        label="Ok"
        icon="pi pi-check"
        @click="closeDeleteCompetence()"
        class="p-button-text"
      />
    </template>
  </Dialog>
  <!-- Delete News -->
  <Dialog
    header="Edit News"
    v-model:visible="inOpenDeleteNews"
    :style="{ width: '600px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <DataTable
        :value="news"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll"
      >
        <Column header="Name" sortable style="min-width: 2rem">
          <template #body="slotProps">
              <span
              >{{ slotProps.data.title}}</span
              >
          </template>
        </Column>
        <Column
          header="Actions"
          style="min-width: 2rem">
          <template #body="slotProps">
            <Button
              @click="deleteNews(slotProps.data.id)"
              label="Remove"
              icon="pi pi-trash"
              class="p-button-raised p-button-danger"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <template #footer>
      <Button
        label="Ok"
        icon="pi pi-check"
        @click="closeDeleteNews()"
        class="p-button-text"
      />
    </template>
  </Dialog>
  <!-- Delete Images -->
  <Dialog
    header="Edit Images"
    v-model:visible="inOpenDeleteImages"
    :style="{ width: '600px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <DataTable
        :value="images"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll"
      >
        <Column header="Information" sortable style="min-width: 2rem">
          <template #body="slotProps">
              <span
              >{{ slotProps.data.alt}}</span
              >
          </template>
        </Column>
        <Column
          header="Actions"
          style="min-width: 2rem">
          <template #body="slotProps">
            <Button
              @click="deleteImages(slotProps.data.id)"
              label="Remove"
              icon="pi pi-trash"
              class="p-button-raised p-button-danger"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <template #footer>
      <Button
        label="Ok"
        icon="pi pi-check"
        @click="closeDeleteImages()"
        class="p-button-text"
      />
    </template>
  </Dialog>
  <!-- Edit Competence -->
  <Dialog
    header="Update score"
    v-model:visible="isOpenEditCompetence"
    :style="{ width: '700px' }"
    :modal="true"
  >
    <div
      class="
          stepsdemo-content
          flex
          flex-column
          justify-content-center
          align-items-center
      "
    >
      <Card class="col-12 md:col-6 lg:col-10">
        <template v-slot:title> Enter your update score </template>
        <template v-slot:content>
          <div class="p-fluid">
            <!-- User -->
            <div class="field">
              <label for="class">Select participant</label>
              <Dropdown
                inputId="class"
                v-model="selectedRanking"
                :options="userCompetition"
                @change="setType($event)"
                optionLabel="fullName"
                placeholder="Select a name"
              />
              <div class="field mt-3">
                <label for="description">New score</label>
                <InputNumber id="description" v-model="alreadyScore" />
              </div>
            </div>
            <!-- Score -->
          </div>
        </template>
        <template v-slot:footer>
          <div class="grid grid-nogutter justify-content-end">
            <i></i>
            <Button
              label="Cancel"
              class="p-button-danger"
              @click="closeEditCompetence()"
              icon="pi pi-angle-left"
            />
            <Button
              label="Accept"
              class="p-button-success ml-3"
              @click="saveUpdateScore()"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </div>
  </Dialog>
</div>
</template>

<script>
import { ClimbingGymsApiService } from "../../services/climbing-gyms-api.service";
import { LocalStoreTopWay } from "../../../LocalStore/LocalStoreTopWay";
import { ScalerApiService } from "../../services/scaler-api.service";

export default {
  name: "ClimbingGymHome",
  data: () => {
    return {
      /// Windows Dialog
      isOpenEditInformation: false,
      isOpenAddCompetence: false,
      isOpenAddNews: false,
      isOpenAddImages: false,
      isOpenCategory: false,
      /// Windows Delete
      inOpenDeleteCompetence: false,
      inOpenDeleteNews: false,
      inOpenDeleteImages: false,
      /// Data for competence, news, images
      competitions: [],
      news: [],
      images: [],
      //variable for add competence
      selectedType: {},
      // Data competences
      nameSelected:{},
      nameCompetition:[],
      userCompetition:[],
      //// variables for the form
      newFeature:{},
      newCompetence:{},
      newNews:{},
      newImages:{},
      /// Edit competences
      selectedRanking: {},
      alreadyScore:0,
      isOpenEditCompetence: false,
      //// variables for competences
      competences: [],
      alreadyCategory: [],
      categories: [],
      //// variables comments
      comments: [],
      // service
      scaler_Service: new ScalerApiService(),
      climbing_gym_Service: new ClimbingGymsApiService(),
      localTopWay: LocalStoreTopWay,
    };
  },
  mounted() {
    this.climbing_gym_Service.findCompetitionByClimbingGymId(this.localTopWay.state.userInfo.id).then(
      (response) => {
        this.nameCompetition = response.data;
        console.log(this.nameCompetition[this.nameCompetition.length - 1].id, "id");
        this.nameSelected = this.nameCompetition[this.nameCompetition.length - 1];
        this.peopleReservationList(this.nameCompetition[this.nameCompetition.length - 1].id);
      }
    );
    /////////// Comments Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .findCommentById(this.localTopWay.state.userInfo.id)
      .then(response =>{
        this.comments = response.data;
        this.comments.forEach(element =>{
          this.scaler_Service
            .findByIdAnonymous(element.scalerId).then(x=>{
            element.user = x.data;
          });
        });
        console.log(this.comments, "Comments");
      });
    /////////// Categories Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .getAllCategory(this.localTopWay.state.userInfo.id)
      .then(response =>{
        this.categories = response.data;
      });
    /////////// Categories already ////////////
    this.climbing_gym_Service
      .findCategoryByClimbingGymId(this.localTopWay.state.userInfo.id)
      .then(response =>{
        this.alreadyCategory = response.data;
      });
  },
  methods: {
    //// Reservation list
    activeReservationList() {
      this.peopleReservationList(this.nameSelected.id);
    },
    peopleReservationList(competitionId) {
      this.climbing_gym_Service
        .findCompetitionReservationByCompetitionGymId(competitionId)
        .then((response) => {
          this.userCompetition = response.data;
          this.userCompetition.forEach(element => {
           element.fullName = element.firstName + " " + element.lastName;
          });
        });
    },
    //// Windows Dialog
    saveEditFeatureForm() {
      console.log(this.newFeature, "newFeature");
      let data={};
      data.type_climb=this.newFeature.typeClimb;
      data.office_hours_start= new Date();
      data.office_hours_end= new Date();
      data.routes=this.newFeature.routes;
      data.max_height=this.newFeature.maxHeight;
      data.rock_type=this.newFeature.rockType;
      data.bolting= this.newFeature.bolting;
      data.price=this.newFeature.price;
      //this.localTopWay.state.userInfo.id
      this.climbing_gym_Service.findFeatureById(this.localTopWay.state.userInfo.id).then((response) => {
        console.log(response, "response");
        this.newFeature.typeClimb=response.data.type_climb;
        this.newFeature.officeHoursStart=response.data.office_hours_start;
        this.newFeature.officeHoursEnd=response.data.office_hours_end;
        this.newFeature.routes=response.data.routes;
        this.newFeature.maxHeight=response.data.max_height;
        this.newFeature.rockType=response.data.rock_type;
        this.newFeature.bolting=response.data.bolting;
        this.newFeature.price=response.data.price;
        this.climbing_gym_Service.updateFeature(this.localTopWay.state.userInfo.id, data).then( response => {
            alert("Update success");
            console.log(response, "response");
            this.isOpenEditInformation = false;
          }
        );
      }).catch((error) => {
        console.log(error, "Don't find");
        this.climbing_gym_Service.createFeature(this.localTopWay.state.userInfo.id, data).then(response => {
          console.log(response, "response");
          this.isOpenEditInformation = false;
          this.newFeature = {};
        }).catch(error => {
          console.log(error, "error");
          alert("Error saving data");
        });
      });
    },
    saveAddCompetenceForm() {
      console.log(this.newCompetence, "newCompetence");
      let data={};
      data.name=this.newCompetence.name;
      data.price=this.newCompetence.price;
      data.type=this.selectedType.name;
      this.climbing_gym_Service.createCompetition(this.localTopWay.state.userInfo.id, data).then(response => {
        console.log(response, "response");
        alert("Create success");
        this.isOpenAddCompetence = false;
        this.newCompetence = {};
        this.selectedType = {};
      }).catch(error => {
        console.log(error, "error");
        alert("Error saving data");
      });
    },
    saveAddNewsForm() {
      console.log(this.newNews, "newNews");
      let data = {};
      data.title = this.newNews.title;
      data.description = this.newNews.description;
      data.urlImage = this.newNews.urlImage;
      this.climbing_gym_Service.createNews(this.localTopWay.state.userInfo.id,data).then(response => {
        console.log(response, "response");
        alert("Create success");
        this.isOpenAddNews = false;
        this.newNews = {};
      }).catch(error => {
        console.log(error, "error");
        alert("Error saving data");
      });
    },
    saveAddImagesForm() {
      console.log(this.newImages, "newImages");
      let data = {};
      data.imageUrl = this.newImages.urlImage;
      data.alt = this.newImages.alt;
      this.climbing_gym_Service.createImage(this.localTopWay.state.userInfo.id,data).then(response => {
        console.log(response, "response");
        alert("Create success");
        this.isOpenAddImages = false;
        this.newImages = {};
      }).catch(error => {
        console.log(error, "error");
        alert("Error saving data");
      });
    },
    ///// Windows Delete
    openDeleteCompetence() {
      this.climbing_gym_Service.findCompetitionByClimbingGymId(this.localTopWay.state.userInfo.id).then((response) => {
        this.competences = response.data;
        if (this.competences.length == 0) {
          alert("You don't have any competences");
        }else {
          this.inOpenDeleteCompetence = true;
        }
      });
    },
    closeDeleteCompetence() {
      this.inOpenDeleteCompetence = false;
    },
    openDeleteNews() {
      this.climbing_gym_Service.findNewsById(this.localTopWay.state.userInfo.id).then((response) => {
        this.news = response.data;
        if (this.news.length == 0) {
          alert("You don't have any news");
        }else {
          this.inOpenDeleteNews = true;
        }
      });
    },
    closeDeleteNews() {
      this.inOpenDeleteNews = false;
    },
    openDeleteImages() {
      this.climbing_gym_Service.findAllImagesById(this.localTopWay.state.userInfo.id).then((response) => {
        this.images = response.data;
        if (this.images.length == 0) {
          alert("You don't have any images");
        }else {
          this.inOpenDeleteImages = true;
        }
      });
    },
    closeDeleteImages() {
      this.inOpenDeleteImages = false;
    },
    /// funtion delete
    deleteCompetence(competitionId) {
      this.climbing_gym_Service.deleteCompetition(competitionId).then((response) => {
        console.log(response, "response");
        alert("Delete success");
        this.closeDeleteCompetence();
        this.competences = [];});
    },
    deleteNews(newsId) {
      this.climbing_gym_Service.deleteNews(newsId).then((response) => {
        console.log(response, "response");
        alert("Delete success");
        this.closeDeleteNews();
        this.news = [];
      });
    },
    deleteImages(imageId) {
      this.climbing_gym_Service.deleteImage(imageId).then((response) => {
        console.log(response, "response");
        alert("Delete success");
        this.closeDeleteImages();
      });
    },
    /////// Windows Dialog
    openEditInformation() {
      this.isOpenEditInformation = true;
      this.climbing_gym_Service.findFeatureById(this.localTopWay.state.userInfo.id).then((response) => {
          console.log(response, "response");
          this.newFeature.typeClimb=response.data.type_climb;
          this.newFeature.officeHoursStart=response.data.office_hours_start;
          this.newFeature.officeHoursEnd=response.data.office_hours_end;
          this.newFeature.routes=response.data.routes;
          this.newFeature.maxHeight=response.data.max_height;
          this.newFeature.rockType=response.data.rock_type;
          this.newFeature.bolting=response.data.bolting;
          this.newFeature.price=response.data.price;}).catch((error) => {
            console.log(error, "Don't find");
          });
    },
    closeEditInformation() {
      this.newFeature = {};
      this.isOpenEditInformation = false;
    },
    openAddCompetence() {
      this.newCompetence = {};
      this.isOpenAddCompetence = true;
    },
    closeAddCompetence() {
      this.newCompetence = {};
      this.isOpenAddCompetence = false;
    },
    openAddNews() {
      this.newNews = {};
      this.isOpenAddNews = true;
    },
    closeAddNews() {
      this.newNews = {};
      this.isOpenAddNews = false;
    },
    openAddImages() {
      this.newImages = {};
      this.isOpenAddImages = true;
    },
    closeAddImages() {
      this.newImages = {};
      this.isOpenAddImages = false;
    },
    closeAddCategory() {
      /////////// Categories already ////////////
      this.climbing_gym_Service
        .findCategoryByClimbingGymId(this.localTopWay.state.userInfo.id)
        .then(response =>{
          this.alreadyCategory = response.data;
        });
      this.isOpenCategory = false;
    },
    openAddCategory() {
      this.isOpenCategory = true;
    },
    //////// function edit
    openEditCompetence() {
      this.isOpenEditCompetence = true;
    },
    closeEditCompetence() {
      this.isOpenEditCompetence = false;
    },
    // edit competence function
    saveUpdateScore() {
      let data = {};
      data.score = this.alreadyScore;
      this.climbing_gym_Service.updateRanking(this.nameSelected.id,this.selectedRanking.id,data).then((response) => {
        console.log(response, "response");
        alert("Update success");
        this.isOpenEditCompetence = false;
        this.alreadyScore = 0;
      }).catch((error) => {
        alert("Please fill in all the fields");
        console.log(error, "error");
        this.alreadyScore = 0;
      });
    },
    ///// validate function
    informationObject(object) {
      if (
        object === undefined ||
        object === null ||
        Object.entries(object).length === 0
      ) {
        return false;
      }
      return true;
    },
    // Rate Competence
    rateCompetition(){
      this.climbing_gym_Service.findScaleRankingByCompetitionGymId(this.nameSelected.id).then((response) => {
        console.log(response, "response");
        if (response.data.length === 0) {
          this.$router.push(`/${this.localTopWay.state.userInfo.name}/competition/${this.nameSelected.id}`);
        } else {
          alert("You have already rated");
        }
      }).catch((error) => {
        console.log(error, "error");
      });

    },
    // Add category
    addCategory(categoryId) {
      let data = {};
      this.climbing_gym_Service.createCategoryGym(this.localTopWay.state.userInfo.id,categoryId, data).then(response => {
        console.log(response, "response");
        alert("Create success");
      }).catch(error => {
        console.log(error, "error");
        alert("You already have that category");
      });
    },
    categoryExist(categoryId) {
      return this.alreadyCategory.find(category => category.id === categoryId);
    },
    deleteCategory(categoryId){
    this.climbing_gym_Service.deleteCategoryGym(this.localTopWay.state.userInfo.id,categoryId).then(response => {
      console.log(response, "response");
      alert("Delete success");
      this.closeAddCategory();
    }).catch(error => {
      console.log(error, "error");
      alert("Error deleting data");
    });
    },
    //// categories select
    setType(event) {
      if (this.selectedType && event.value) {
        this.selectedType = event.value;
      }
    },
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Suez+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,500&display=swap");

.font {
  font-family: "Open Sans", sans-serif;
}
</style>