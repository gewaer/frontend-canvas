<template>
<div class="add-custom-filter-modal">
    <div class="row modal-header">
        <div class="col d-flex align-items-center">
            <h5>Add custom filter</h5>
            <a class="ml-auto" href="#" @click="$modal.hide('add-custom-filter')">x</a>
        </div>
    </div>
    <div class="row modal-body">
        <div class="col">
            <div class="row align-items-center m-b-20">
                <div class="col-auto">
                    <div class="step-number">1</div>
                </div>
                <div class="col">
                    <div class="form-group form-group-default required">
                        <input
                            class="form-control"
                            type="text"
                            name="filter-name"
                            placeholder="Filter name">
                    </div>
                </div>
            </div>
            <div class="row m-b-20">
                <div class="col-auto">
                    <div class="step-number">2</div>
                </div>
                <div class="col">
                    <label>Add a condition</label>
                    <div class="form-group filters-conditions">
                        <select class="full-width" data-init-plugin="select2">
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="form-group filters-conditions">
                        <select class="full-width" data-init-plugin="select2">
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="form-group filters-conditions">
                        <select class="full-width" data-init-plugin="select2">
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                            <optgroup label="This is a filter group">
                                <option value="1">Filter 1</option>
                                <option value="2">Filter 2</option>
                                <option value="3">Filter 3</option>
                                <option value="4">Filter 4</option>
                                <option value="5">Filter 5</option>
                            </optgroup>
                        </select>
                    </div>
                    <a href="#"><i class="fa fa-plus-circle"/> Add a condition</a>
                </div>
            </div>
            <div class="row align-items-center m-b-20">
                <div class="col-auto">
                    <div class="step-number">3</div>
                </div>
                <div class="col">
                    <div class="radio radio-success">
                        <input
                            id="match-all"
                            type="radio"
                            value="all"
                            name="conditions-match">
                        <label for="match-all">Match ALL the conditions</label>
                        <input
                            id="match-any"
                            type="radio"
                            value="any"
                            name="conditions-match">
                        <label for="match-any">Match ANY condition</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row modal-footer">
        <div class="col">
            <button class="btn btn-block" @click="$modal.hide('add-custom-filter')">Cancel</button>
        </div>
        <div class="col">
            <button class="btn btn-block btn-primary">Save</button>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.add-custom-filter-modal {
    .step-number {
        background-color: #eaeaea;
        width: 25px;
        height: 25px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form-group {
        margin-bottom: 0;
    }

    .filters-conditions {
        margin-bottom: 10px;

        select {
            height: 34px;
            color: #999;

            option {
                color: black;
            }
        }
    }

    .radio label {
        margin-bottom: 0;
    }
}
</style>
