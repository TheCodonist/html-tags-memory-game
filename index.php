<?php
function site_url(){
    return sprintf(
        "%s://%s",
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
        $_SERVER['HTTP_HOST']
    );
}
?>

<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="https://fonts.googleapis.com/css?family=Fjalla+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="./css/font-awesome.min.css">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/responsive.css">

    <style>
        .loader {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            z-index: 9999;
        }

        .loader .fa {
            font-size: 10vh;
            text-align: center;
            text-transform: uppercase;
            font-weight: 700;
        }
    </style>

    <title>HTML Master</title>

    <script>
        let base_url = "<?php echo (strpos($_SERVER['HTTP_HOST'], ".") > 0) ? site_url() . '/html-game' : site_url(); ?>";
    </script>
</head>
<body>
<div class="loader">
    <i class="fa fa-spinner fa-spin"></i>
</div>

<section id="htmlMaster" class="main-section">
    <h1>{{heading}}</h1>
    <div class="top-tagers-tbl">
        <div class="table-responsive">
            <table id="resultBoard" class="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>No: of Tags</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row,index) in rows">
                    <td>{{row.name}}</td>
                    <td>{{index + 1}}</td>
                    <td>{{row.no_of_tags}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <form v-show="tagFormActive" id="tagForm">
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">Time Remaining : <span id="countDownValue">{{player.totalTime}}</span> Sec</div>
            </div>
            <input @keypress="typeTag" name="typeTag" type="text" class="form-control" v-bind:class="activeTypeClass" placeholder="Type HTML Tag and press Enter">
            <div class="input-group-append">
                <div class="input-group-text"><span id="countTags">{{player.insertedTags.length}}</span> Tag Entered</div>
            </div>
        </div>
        <small class="form-text text-muted"><span class="bg-success"></span> Tag Found <span class="ml-2 bg-danger"></span> Tag Not Found <span class="ml-2 bg-warning"></span> Tag Repeated</small>
    </form>
    <div v-show="playAgainActive" class="play-again text-center">
        <button @click="playAgain" class="btn btn-success">Play Again</button>
        <p>For Suggestions <a href="http://codonist.com/#contactUs">Click Here</a>.</p>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="nameModal" tabindex="-1" role="dialog" aria-labelledby="nameModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="nameModalLabel">Your NicK Name</h5>
                </div>
                <div class="modal-body">
                    <input v-model="player.name" name="playerName" type="text" class="form-control" placeholder="Please Enter Your Name">
                    <p class="mt-1 text-muted" style="font-size: 12px">
                        <b>How to Play:</b> After pressing play button, the Count Down will be started. Just type HTML tags
                        <small>( <b>without angle brackets</b> )</small>
                        and press enter. You have just 1 minute. Play and Enjoy.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="play">Play!</button>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- JavaScript -->
<script src="./js/jquery-3.3.1.min.js"></script>
<script src="./js/popper.min.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="./js/main.js"></script>


</body>
</html>