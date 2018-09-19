var tags = "!--.!DOCTYPE.a.abbr.acronym.address.applet.area.article.aside.audio.b.base.basefont.bdi.bdo.big.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.dir.div.dl.dt.em.embed.fieldset.figcaption.figure.font.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.link.main.map.mark.meta.meter.nav.noframes.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rp.rt.ruby.s.samp.script.section.select.small.source.span.strike.strong.style.sub.summary.sup.svg.table.tbody.td.template.textarea.tfoot.th.thead.time.title.tr.track.tt.u.ul.var.video.wbr";
var insertedTags = [];
var countTags = 0;

function getData() {
    var template = "";
    $.ajax({
        url : './includes/db.php',
        type : 'POST',
        data : {
            action : 'get'
        },
        dataType: 'JSON',
        success : function (res) {
            res.forEach(function (item,i) {
                template += '<tr><td>' + item['name'] + '</td><td>' + (i+1) + '</td><td>' + item['no_of_tags'] + '</td></tr>';
            });

            $('#resultBoard tbody').html(template);
        },
        error : function (res) {
            console.log(res);
        }
    });
}

function insertData(name,tags) {
    $.ajax({
        url : './includes/db.php',
        type : 'POST',
        data : {
            action : 'insert',
            name : name,
            no_of_tags : tags
        },
        success : function (res) {
            getData();
        },
        error : function (data) {
            console.log(data);
        }
    })
}
function reset() {
    $('input[name="typeTag"]').attr('disabled',false);
    $('#countTags').text(0);
    insertedTags.length = 0;
    countTags = 0;
}
function startPlaying() {
    reset();
    var totaltime = 60;
    var secInterval = setInterval(function () {
        $('#countDownValue').text(--totaltime);
        if(totaltime == 0){
            clearInterval(secInterval);
            $('input[name="typeTag"]').attr('disabled',true);
            $('#tagForm').hide();
            $('.play-again').show();
            insertData($('[name="playerName"]').val().trim(), countTags);
        }
    },1000);
}

function findTag(tag) {
    tag = tag.replace('.','');
    var reg = new RegExp('\\.' + tag + '\\.','gi');
    if(insertedTags.indexOf('.' + tag + '.') >= 0 ){
        return 'warn';
    }else{
        var res = tags.match(reg);
        if(res){
            insertedTags.push(res[0]);
            return 'success';
        }else{
            return 'danger';
        }
    }
}

function updateCountTags(){
    $('#countTags').text(++countTags)
}
$(document).ready(function () {
    getData();
    $('#nameModal').modal({
        backdrop : 'static',
        keyboard: false
    });
    $('#nameModal').modal('show');
    $('#playBtn').on('click',function () {
        if($('[name="playerName"]').val().trim().length >= 2){
            $('#nameModal').modal('hide');
            $('#tagForm').show();
        }else{
            $('[name="playerName"]').focus();
        }
    });

    $('#playAgainBtn').on('click',function () {
        $('.play-again').hide();
        $('#nameModal').modal('show');
    });
    $('#nameModal').on('hidden.bs.modal', function (e) {
        startPlaying();
        $('input[name="typeTag"]').focus();
    });


    $('input[name="typeTag"]').on('keypress',function (e) {
        if(e.keyCode == 13){
            var result = findTag($(this).val());
            if(result == 'success'){
                updateCountTags();
                $(this).addClass('is-valid');
            }else if(result == "warn"){
                $(this).addClass('is-warned');
            }else{
                $(this).addClass('is-invalid');
            }
            setTimeout(function () {
                $('input[name="typeTag"]').removeClass('is-valid is-invalid is-warned');
            },500);

            $(this).val('');
            e.preventDefault()
        }
    });
});