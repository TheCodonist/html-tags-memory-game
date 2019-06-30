$(document).ready(function () {
    let game = new Vue({
        el: '#htmlMaster',
        data: {
            url: 'http://codonist.com/html-game',
            heading: 'Top HTML Tagers',
            tags: "!--.!DOCTYPE.a.abbr.acronym.address.applet.area.article.aside.audio.b.base.basefont.bdi.bdo.big.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.dir.div.dl.dt.em.embed.fieldset.figcaption.figure.font.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.link.main.map.mark.meta.meter.nav.noframes.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rp.rt.ruby.s.samp.script.section.select.small.source.span.strike.strong.style.sub.summary.sup.svg.table.tbody.td.template.textarea.tfoot.th.thead.time.title.tr.track.tt.u.ul.var.video.wbr",
            rows: null,
            player : {
                name : null,
                insertedTags : [],
                totalTime: 60
            },
            activeTypeClass: '',
            playAgainActive: false,
            tagFormActive: false
        },
        created: function () {
            $('.loader').remove();
        },
        mounted() {
            $('#nameModal').modal({
                backdrop: 'static',
                keyboard: false
            });
            $('#nameModal').modal('show');
            this.getData()
        },
        methods : {
            getData : function () {
                axios({
                    url: base_url + '/includes/db.php?action=get',
                    method: 'GET'
                }).then(function (response) {
                    game.rows = response.data;
                });
            },
            insertData : function () {
                let app = this;
                axios({
                    url: base_url + '/includes/db.php',
                    method: 'POST',
                    params: {
                        action: 'insert',
                        name: app.player.name,
                        no_of_tags: app.player.insertedTags.length
                    }
                }).then(function (response) {
                    console.log(response);
                    app.getData();
                });
            },
            play : function () {
                if ($('[name="playerName"]').val().trim().length >= 2) {
                    $('#nameModal').modal('hide');
                    this.tagFormActive = true;
                } else {
                    $('[name="playerName"]').focus();
                }
            },
            playAgain : function () {
                this.playAgainActive = false;
                $('#nameModal').modal('show');
            },
            startPlaying : function () {
                let app = this;
                app.reset();
                let secInterval = setInterval(function () {
                    --app.player.totalTime;
                    if (app.player.totalTime === 0) {
                        clearInterval(secInterval);
                        $('input[name="typeTag"]').attr('disabled', true);
                        app.tagFormActive = false;
                        app.playAgainActive = true;
                        app.insertData();
                    }
                }, 1000);
            },
            typeTag : function (e) {
                let app = this;
                if (e.keyCode === 13) {
                    app.findTag($(e.target).val());
                    setTimeout(function () {
                        app.activeTypeClass = '';
                    }, 500);
                    $(e.target).val('');
                    e.preventDefault();
                }
            },
            reset : function () {
                let app = this;
                $('input[name="typeTag"]').attr('disabled', false);
                app.player.insertedTags.length = 0;
            },
            findTag : function (tag) {
                let app = this;
                tag = tag.replace('.', '');
                let reg = new RegExp('\\.' + tag + '\\.', 'gi');

                if (app.player.insertedTags.indexOf('.' + tag + '.') >= 0) {
                    app.activeTypeClass = 'is-warned';
                } else {
                    let res = app.tags.match(reg);
                    if (res) {
                        app.player.insertedTags.push(res[0]);
                        app.activeTypeClass = 'is-valid';
                    } else {
                        app.activeTypeClass = 'is-invalid';
                    }
                }
            }
        }
    });

    $('#nameModal').on('hidden.bs.modal', function (e) {
        game.startPlaying();
        $('input[name="typeTag"]').focus();
    });
});