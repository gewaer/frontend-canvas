<template>
    <div class="welcome-card">
        <div class="card">
            <div class="row">
                <div class="col-12 col-xl-9">
                    <div class="d-flex flex-column align-items-start">
                        <h1>Welcome to Kanvas Skeleton</h1>
                        <p>Kanvas is a Smart Code Development Enviorment. With it we want to go beyond and above being just another boilerplate. We aim to offer solutions to common (and sometimes uncommon) needs developers have. We want to help developers quickly deploy apps by writing as less code as possible, while still keeping a high degree of customization and adaptability.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h2>What's this?</h2>
                    <p>It's the initial Boilerplate Code for Smart SPA Development. We will provide common examples on how to develop your app.</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary">
                        START THE QUICK TUTORIAL
                    </button>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-12 col-xl mb-4 mb-xl-0">
                    <div class="cta">
                        <div class="row align-items-center">
                            <div class="col-12 col-sm-auto d-flex justify-content-center">
                                <i class="fas fa-book" />
                            </div>
                            <div class="col-12 col-sm text-center text-sm-left">
                                <h3>Read the documentation</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl">
                    <div class="cta">
                        <div class="row align-items-center">
                            <div class="col-12 col-sm-auto d-flex justify-content-center">
                                <i class="fas fa-code" />
                            </div>
                            <div class="col-12 col-sm text-center text-sm-left">
                                <h3>Code examples</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WelcomeCard"
}
</script>

<style lang="scss" scoped>
.welcome-card {
    hr {
        margin-top: 40px;
        margin-bottom: 40px;
    }

    h1 {
        margin-bottom: 15px;
        border-bottom: 3px solid #ee761b;

        & + p {
            opacity: .6;
        }
    }

    i {
        font-size: 50px;
    }

    .cta {
        background-color: #f7f7f8;
        padding: 25px 40px;
        opacity: .8;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;

        i {
            font-size: 36px;

            &.fa-book {
                color: #47b98a;
            }

            &.fa-code {
                color: #ee761b;
            }

            @media (max-width: $sm) {
                margin-bottom: 25px;
                font-size: 45px;
            }
        }

        h3 {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 5px;
        }

        p {
            margin-bottom: 0;
        }
    }
}
</style>
