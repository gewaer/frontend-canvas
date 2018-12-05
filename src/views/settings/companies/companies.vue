<template>
<div class="row">
    <div class="col">
        <h5>Companies <button class="btn btn-primary">New company</button></h5>
        <div class="table-responsive">
            <table class="table table-hover table-condensed">
                <thead>
                    <tr>
                        <th style="width:30%">Logo</th>
                        <th style="width:30%">Name</th>
                        <th style="width:20%">Lorem Dolor</th>
                        <th style="width:10%">Lorem Dolor</th>
                        <th style="width:15%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="v-align-middle semi-bold">
                            <img src="https://mctekk.com/images/logo-o.svg" height="25px" alt="Company Logo">
                        </td>
                        <td class="v-align-middle semi-bold">MCTEKK</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor sit amet</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-primary m-l-5"><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"></i></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">
                            <img src="https://www.nzxt.com/assets/black-logo-large-a099ca343472c7fe3d7744dabb9fcd9b6625ab47fa60ab94ddd90354548a03f3.png" height="25px" alt="Company Logo">
                        </td>
                        <td class="v-align-middle semi-bold">NZXT</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor sit amet</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-primary m-l-5"><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"></i></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">
                            <img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/8638369/Logo_for_white_BG_copy.jpg" height="25px" alt="Company Logo">
                        </td>
                        <td class="v-align-middle semi-bold">LetsBLD</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor sit amet</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-primary m-l-5"><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"></i></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold text-">
                            <img src="https://udemy-images.udemy.com/course/480x270/1356644_1f10_7.jpg" height="25px" alt="Company Logo">
                        </td>
                        <td class="v-align-middle semi-bold">Ninja</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor sit amet</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-primary m-l-5"><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"></i></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                    <tr v-for="company in companies" :key="`company-${company.id}`">
                        <td class="v-align-middle semi-bold text-">
                            <img :src="company.profile_image || defaultImage" height="25px" alt="Company Logo">
                        </td>
                        <td class="v-align-middle semi-bold"> {{ company.name }}</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor sit amet</td>
                        <td class="v-align-middle semi-bold">Lorem Dolor</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-primary m-l-5"><i class="fa fa-eye" aria-hidden="true"></i></button>
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"></i></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "companies",
    props: {
        companies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            defaultImage: "https://mctekk.com/images/logo-o.svg"
        }
    }
};
</script>

