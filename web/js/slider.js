/*! -------------------------------------------------------------------------------------------
JAVASCRIPT main engine!

* @Version:    1.0 - 2016
* @author:     Burocratik
* @email:      hello@burocratik.com
* @website:    http://www.burocratik.com
* @preserve
NOTES:
:: js-no-ajax class on body (nao pode ser no html) > take it off with js as soon I work with ajax
:: js-no-ajax = did refresh
:: body.js-byrefresh= when i start by direct link (refresh) do no show content before loading
:: #loading-page.js-loading-page = i need separate byrefresh of this when I have js off
:: js-loading-page = can be used if I need a global style only when I am loading content
:: mobile = tag html is via js, tag body is via php (can't be on html tag or is deleted), also used for IE<=10
:: _global_allowNavigate = do not allow multiple cliks to load ajax (arrow, keys, click)
:: js-no-transPage = when I want a domain link with no transition ajax animation
--------------------------------------------------------------------------------------------*/
//END LOAD DOCUMENT
/********************************************************************************************
 **                                                                                       **
      =LOADING PAGES, SECTIONS - =transitions between pages, =ajax
 **                                                                                       **
*********************************************************************************************/
//** MAIN LOAD
function loadPages(newContent, pageTransition) {
    var $currentPage = $(".page-main.page-current"),
        $nextContent = $(".page-main.page-next");
    if ( // can't be global
        "loadMoreFormacao" != pageTransition && "archiveFormacoes" != pageTransition && ($("html,body").addClass("fixed-all"), $_body.removeClass("js-no-ajax"), // I am using =ajax
            $_body.addClass("js-loading-page"), // loading by ajax (removed onStartPage())
            //Check if header is out of view and setup
            animateMainNav("init")), "default" == pageTransition) // end nextContent load
        return void $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
            var $this = $(this); //=404
            return $this.html() ? (manageBodyClasses(), void TweenMax.fromTo($currentPage, .25, {
                opacity: 1
            }, {
                opacity: 0,
                onComplete: function() {
                    animateMainNav("start"), TweenMax.set($nextContent.find(".page-toload"), {
                        opacity: 0
                    }), clearPagesAfterloading(0)
                }
            })) : (window.location = newContent, !1)
        });
//    if ("archiveFormacoes" == pageTransition) {
//        var $loadingBtn = $(".page-header").find(".circle-btn"),
//            $progressSVG = Snap("#loading-progress"),
//            $downSvg = $loadingBtn.find(".icon").find("path"),
//            rgb_color = $loadingBtn.css("backgroundColor").match(/\d+/g),
//            progress = $progressSVG.circle(34, 34, 32.5);
//        return $("html,body").addClass("fixed-all"), $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, 1, {
//            scrollTo: {
//                y: $(".page-header")
//            },
//            ease: Power4.easeOut
//        }) : TweenMax.to($_body, 1, {
//            scrollTo: {
//                y: $(".page-header")
//            },
//            ease: Power4.easeOut
//        }), progress.attr({
//            fill: "none",
//            stroke: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",1)",
//            strokeWidth: 2,
//            strokeLinecap: "round",
//            strokeDasharray: 204.1,
//            strokeDashoffset: 204.1,
//            transform: "rotate(-45deg)",
//            class: "loading-timer"
//        }), $downSvg.removeClass("active"), $loadingBtn.addClass("remove-bg"), void TweenMax.to($loadingBtn, .4, {
//            border: "2px solid rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",0)",
//            backgroundColor: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",0)",
//            delay: 0,
//            ease: Circ.easeInOut,
//            onComplete: function() {
//                TweenMax.to($("#loading-progress").find("circle"), 2, {
//                    strokeDashoffset: 40,
//                    ease: Expo.easeOut
//                }), $.doTimeout(200, function() {
//                    $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
//                        var $nextFormacaoListContainer = ($(this), $currentPage.find(".formacao-list-container"), $nextContent.find(".formacao-list-container > a")),
//                            $loadMore = $currentPage.find(".load-more"),
//                            $seeMoreTitle = $currentPage.find(".see-more-title"),
//                            $seeMoreBg = ($(".courses-picker"), $(".see-more-bg"));
//                        $loadMore.empty(), $seeMoreTitle.attr("style", ""), TweenMax.set($seeMoreBg, {
//                            scale: 0
//                        }), $_body.hasClass("js-all-formacoes") ? $(".see-more").show() : $(".see-more").hide(), $currentPage.find(".formacao-list-container > a").remove(), $currentPage.find(".formacao-list-container").prepend($nextFormacaoListContainer), $_body.removeClass("js-all-formacoes"), $nextContent.empty(), $currentPage.find(".formacao-list-container").attr("style", ""), $("html,body").removeClass("fixed-all"), _global_allowNavigate = !0, TweenMax.to($("#loading-progress").find("circle"), 2, {
//                            strokeDashoffset: 0,
//                            ease: Expo.easeOut
//                        }), $downSvg.addClass("active"), TweenMax.to($loadingBtn, .4, {
//                            border: "2px solid rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",.3)",
//                            backgroundColor: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",1)",
//                            ease: Circ.easeInOut,
//                            onComplete: function() {
//                                TweenMax.set($loadingBtn.find("circle"), {
//                                    strokeDashoffset: 204.1
//                                }), $loadingBtn.removeClass("remove-bg")
//                            }
//                        }), initformacaoListEvents(), $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, 1, {
//                            scrollTo: {
//                                y: $(".courses-picker")
//                            },
//                            ease: Power4.easeOut
//                        }) : TweenMax.to($_body, 1, {
//                            scrollTo: {
//                                y: $(".courses-picker")
//                            },
//                            ease: Power4.easeOut
//                        })
//                    })
//                })
//            }
//        })
//    }
//    if ("loadMoreFormacao" == pageTransition) {
//        var $seeMore = ($currentPage.find(".load-more"), $currentPage.find(".see-more")); // end nextContent load
//        return void $nextContent.load(newContent + " .page-toload .formacao-list-container", function(response, status, xhr) {
//            var $this = $(this),
//                $tempList = $this.find(".formacao-list-container > *");
//            TweenMax.set($tempList, {
//                    autoAlpha: 0
//                }), TweenMax.set($tempList.eq(0), {
//                    marginTop: "230px"
//                }), $currentPage.find(".formacao-list-container").append($tempList), TweenMax.to($tempList, 1, {
//                    autoAlpha: 1
//                }),
//                // $loadMore.append($this.find(".formacao-list-container"));
//                $nextContent.empty(), TweenMax.set($seeMore.find(".finished-link").closest(".see-more"), {
//                    opacity: 0
//                }), $.doTimeout(300, function() {
//                    $seeMore.find(".finished-link").closest(".see-more").addClass("open"), TweenMax.set($seeMore.find(".finished-link").closest(".see-more"), {
//                        opacity: 1
//                    })
//                }), TweenMax.to($seeMore.find(".see-more-bg"), 1, {
//                    scale: 30,
//                    delay: .2,
//                    ease: Expo.easeOut
//                }), TweenMax.to($seeMore.find(".see-more-title"), 1, {
//                    opacity: 1,
//                    y: 0,
//                    pointerEvents: "auto",
//                    delay: .3,
//                    ease: Expo.easeOut,
//                    onComplete: function() {
//                        initformacaoListEvents(), $nextContent.empty(), $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, 1, {
//                            scrollTo: {
//                                y: $(".load-more")
//                            },
//                            ease: Power4.easeOut
//                        }) : TweenMax.to($_body, 1, {
//                            scrollTo: {
//                                y: $(".load-more")
//                            },
//                            ease: Power4.easeOut
//                        })
//                    }
//                }), _global_allowNavigate = !0
//        })
//    }
//    if ("blue-bg" == pageTransition) // end nextContent load
//        return void $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
//            var $this = $(this); //=404
//            return $this.html() ? (manageBodyClasses(), void TweenMax.fromTo([$currentPage.find(".page-header > *"), $currentPage.find(".page-content > *")], .25, {
//                opacity: 1
//            }, {
//                opacity: 0,
//                onComplete: function() {
//                    animateMainNav("start"), clearPagesAfterloading(0)
//                }
//            })) : (window.location = newContent, !1)
//        });
//    if ("inscTrans" == pageTransition) // end nextContent load
//        return void $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
//            var $this = $(this);
//            if (!$this.html()) //=404
//                return window.location = newContent, !1;
//            manageBodyClasses();
//            var $activeLink = $(".js-active-link"),
//                padding_val = ($activeLink.offset().top - $_window.scrollTop() - _globalViewportH / 2 + $activeLink.height() / 2, _globalViewportH - $activeLink.find(".formacao-list-item").height());
//            padding_val /= 2, $activeLink.css("z-index", "99999"), animateMainNav("start"), TweenMax.to($activeLink.find(".formacao-list-item"), .8, {
//                y: -($activeLink.offset().top - $_window.scrollTop()) - 6,
//                paddingTop: padding_val,
//                paddingBottom: padding_val,
//                ease: Expo.easeOut,
//                onComplete: function() {
//                    clearPagesAfterloading(0)
//                }
//            }), TweenMax.to([$activeLink.find(".text-right"), $currentPage.find(".page-header"), $activeLink.find(".course-type"), $currentPage.find(".see-more")], .2, {
//                opacity: 0,
//                ease: Expo.easeOut
//            }), TweenMax.to($activeLink.find("h3"), .8, {
//                opacity: 1,
//                ease: Expo.easeOut
//            })
//        });
//    if ("formTrans-alt" == pageTransition) // end nextContent load
//        return void $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
//            var $this = $(this);
//            if (!$this.html()) //=404
//                return window.location = newContent, !1;
//            manageBodyClasses();
//            var $consultasCall = $(".consultas-call-to-action-container"),
//                padding_val = ($consultasCall.offset().top - $_window.scrollTop() - _globalViewportH / 2 + $consultasCall.height() / 2, _globalViewportH - $consultasCall.height());
//            padding_val /= 2, $_body.removeClass("home"), $("#header-main h1 .logo .logo-svg .logo-path").css({
//                    fill: "#ffffff"
//                }), animateMainNav("start"), TweenMax.to($(".js-not-form"), 1, {
//                    y: -($consultasCall.offset().top - $_window.scrollTop()),
//                    opacity: 0,
//                    ease: Expo.easeOut
//                }), TweenMax.to([$consultasCall.find(".title"), $consultasCall.find(".form-container")], .2, {
//                    opacity: 0,
//                    ease: Expo.easeOut
//                }), $headerCopy = $nextContent.find(".page-header"), $consultasCall.prepend($headerCopy.clone()), TweenMax.set($consultasCall.find(".page-header"), {
//                    position: "absolute",
//                    width: "100%",
//                    height: "100%",
//                    top: 0,
//                    left: 0,
//                    opacity: 0,
//                    y: "100px"
//                }), TweenMax.set($consultasCall.find(".page-header h2"), {
//                    color: "#ffffff"
//                }), TweenMax.set($consultasCall.find(".page-header h2"), {
//                    opacity: 1
//                }),
//                // var _top = $consultasCall.find(".page-header")[0].getBoundingClientRect().top;
//                // var _top = $consultasCall.find(".page-header").offset().top;
//                // console.log(_top);
//                // TweenMax.to($consultasCall.find(".page-header"), .8, {opacity:1, y:-_top + 280, ease: Expo.easeOut});
//                TweenMax.to($consultasCall, .8, {
//                    y: -($consultasCall.offset().top - $_window.scrollTop()),
//                    paddingTop: padding_val,
//                    paddingBottom: padding_val,
//                    ease: Expo.easeOut,
//                    onComplete: function() {
//                        clearPagesAfterloading(0)
//                    }
//                })
//        });
//    if ("inscTrans-second" == pageTransition) {
//        var $loadingBtn = $(".page-header").find(".circle-btn"),
//            $progressSVG = Snap("#loading-progress"),
//            $downSvg = $loadingBtn.find(".icon").find("path"),
//            rgb_color = $loadingBtn.css("backgroundColor").match(/\d+/g),
//            progress = $progressSVG.circle(34, 34, 32.5);
//        return progress.attr({
//            fill: "none",
//            stroke: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",1)",
//            strokeWidth: 2,
//            strokeLinecap: "round",
//            strokeDasharray: 204.1,
//            strokeDashoffset: 204.1,
//            transform: "rotate(-45deg)",
//            class: "loading-timer"
//        }), $downSvg.removeClass("active"), $loadingBtn.addClass("remove-bg"), TweenMax.to($loadingBtn, .4, {
//            border: "2px solid rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",0)",
//            backgroundColor: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",0)",
//            delay: 0,
//            ease: Circ.easeInOut,
//            onComplete: function() {
//                TweenMax.to($("#loading-progress").find("circle"), 2, {
//                    strokeDashoffset: 40,
//                    ease: Expo.easeOut
//                }), $.doTimeout(200, function() {
//                    $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
//                        var $loadMore = ($(this), $currentPage.find(".formacao-list-container"), $nextContent.find(".formacao-list-container > a"), $currentPage.find(".load-more")),
//                            $seeMoreTitle = $currentPage.find(".see-more-title"),
//                            $seeMoreBg = ($(".courses-picker"), $(".see-more-bg"));
//                        $loadMore.empty(), $seeMoreTitle.attr("style", ""), TweenMax.set($seeMoreBg, {
//                            scale: 0
//                        }), TweenMax.to($("#loading-progress").find("circle"), 2, {
//                            strokeDashoffset: 0,
//                            ease: Expo.easeOut
//                        }), $downSvg.addClass("active"), TweenMax.to($loadingBtn, .4, {
//                            border: "2px solid rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",.3)",
//                            backgroundColor: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",1)",
//                            ease: Circ.easeInOut,
//                            onComplete: function() {
//                                TweenMax.set($loadingBtn.find("circle"), {
//                                    strokeDashoffset: 204.1
//                                }), $loadingBtn.removeClass("remove-bg")
//                            }
//                        })
//                    })
//                })
//            }
//        }), void $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
//            var $this = $(this);
//            if (!$this.html()) //=404
//                return window.location = newContent, !1;
//            manageBodyClasses();
//            var $pageHeader = $currentPage.find(".page-header");
//            animateMainNav("reset"), $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, 1, {
//                scrollTo: {
//                    y: 0
//                },
//                ease: Power4.easeOut,
//                onComplete: function() {
//                    TweenMax.to($pageHeader.find("h2:not('.inscricao-page-first-title')"), 1, {
//                        borderColor: "rgba(255,255,255,1)"
//                    }), $pageHeader.find(".circle-btn .arrow-down path").removeClass("active"), TweenMax.staggerTo($(".course-specs .columns"), .5, {
//                        y: "20px",
//                        opacity: 0,
//                        ease: Expo.easeOut
//                    }, .1);
//                    var _top = $(".text-wrapper")[0].getBoundingClientRect().top;
//                    TweenMax.staggerTo($(".page-current .text-wrapper").find("h2"), 1, {
//                        top: -_top + 180,
//                        ease: Expo.easeOut,
//                        delay: 1
//                    }, .1), clearPagesAfterloading(2e3), TweenMax.to($pageHeader.find(".circle-btn"), 1, {
//                        scale: 0,
//                        delay: 1,
//                        ease: Elastic.easeOut.config(1, 1),
//                        onComplete: function() {}
//                    }), TweenMax.to($pageHeader.find(".btn"), 1, {
//                        opacity: 0
//                    })
//                }
//            }) : TweenMax.to($_body, 1, {
//                scrollTo: {
//                    y: 0
//                },
//                ease: Power4.easeOut,
//                onComplete: function() {
//                    TweenMax.to($pageHeader.find("h2:not('.inscricao-page-first-title')"), 1, {
//                        borderColor: "rgba(255,255,255,1)"
//                    }), $pageHeader.find(".circle-btn .arrow-down path").removeClass("active"), TweenMax.staggerTo($(".course-specs .columns"), .5, {
//                        y: "20px",
//                        opacity: 0,
//                        ease: Expo.easeOut
//                    }, .1);
//                    var _top = $(".text-wrapper")[0].getBoundingClientRect().top;
//                    TweenMax.staggerTo($(".page-current .text-wrapper").find("h2"), 1, {
//                        top: -_top + 180,
//                        ease: Expo.easeOut,
//                        delay: 1
//                    }, .1), clearPagesAfterloading(2e3), TweenMax.to($pageHeader.find(".circle-btn"), 1, {
//                        scale: 0,
//                        delay: 1,
//                        ease: Elastic.easeOut.config(1, 1),
//                        onComplete: function() {}
//                    }), TweenMax.to($pageHeader.find(".btn"), 1, {
//                        opacity: 0
//                    })
//                }
//            })
//        })
//    }
    return "formTrans" == pageTransition ? void $nextContent.load(newContent + " .page-toload", function(response, status, xhr) {
        var $this = $(this);
        if (!$this.html()) //=404
            return window.location = newContent, !1;
        manageBodyClasses();
        //Height of the biggest item plus 150px for wrapper
        var height = 0;
        $nextContent.find(".form-item-container").each(function() {
            var $this = $(this);
            $this.height() > height && (height = $this.height())
        }), height += 150, $nextContent.find(".inscricao-page .inscricao-form").css("height", height), TweenMax.to($(".js-not-form"), 1, {
            y: -($(".consultas-call-to-action-container").offset().top - $_window.scrollTop()),
            opacity: 0,
            ease: Expo.easeOut
        }), TweenMax.to($("footer"), 1, {
            autoAlpha: 0,
            ease: Expo.easeOut
        }), TweenMax.to($(".consultas-call-to-action-container .title"), 1, {
            opacity: 0,
            ease: Expo.easeOut
        });
        var fakeContainerHeight = height - $(".consultas-call-to-action-container").height();
        TweenMax.to($(".consultas-call-to-action-container"), 1, {
            y: -($(".consultas-call-to-action-container").offset().top - $_window.scrollTop()),
            paddingTop: fakeContainerHeight / 2,
            paddingBottom: fakeContainerHeight / 2,
            ease: Expo.easeOut,
            onComplete: function() {
                setFormPosition($nextContent, function() {
                    animateMainNav("start"), clearPagesAfterloading(0)
                })
            }
        })
    }) : void 0
} //////end function main load content
function setFormPosition($nextContent, f) {
    var $nextFormItemContainer = $nextContent.find(".form-item-container");
    $nextContent.css({
        position: "absolute",
        width: "100%",
        height: "auto",
        "min-height": "100vh",
        transform: "translate3d(0,0,0)"
    }), TweenMax.set($nextContent, {
        autoAlpha: 0
    }), TweenMax.set($nextFormItemContainer, {
        opacity: .2
    }), TweenMax.set($nextFormItemContainer.eq(0), {
        y: $nextFormItemContainer.eq(0).height() - 80,
        opacity: .2
    }), TweenMax.set($nextFormItemContainer.eq(1), {
        y: $nextFormItemContainer.eq(0).height(),
        opacity: 0
    }), TweenMax.set($nextFormItemContainer.find(".form-item-title"), {
        opacity: 0
    }), $_body.addClass("js-fromTrans"), $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.set($_window, {
        scrollTo: {
            y: $nextContent.find(".form-container")
        },
        onComplete: function() {
            TweenMax.to($nextContent, 0, {
                autoAlpha: 1
            }), TweenMax.to($nextContent.find("faded"), .2, {
                opacity: 1
            }), "function" == typeof f && f()
        }
    }) : TweenMax.set($_body, {
        scrollTo: {
            y: $nextContent.find(".form-container")
        },
        onComplete: function() {
            TweenMax.to($nextContent, 0, {
                autoAlpha: 1
            }), TweenMax.to($nextContent.find("faded"), .2, {
                opacity: 1
            }), "function" == typeof f && f()
        }
    })
}

function clearPagesAfterloading(delay) {
    var $currentPage = $(".page-main.page-current"),
        $nextContent = $(".page-main.page-next"); // can't be global
    ($_body.hasClass("sobre-page") || $_body.hasClass(".four-o-four-page")) && $(".slideshow-container").vTicker("remove"), $.doTimeout(delay, function() {
        $currentPage.remove(), $nextContent.removeClass("page-next"), $nextContent.addClass("page-current").attr("role", "main").removeAttr("aria-hidden");
        var $newCurrentPage = $(".page-main.page-current");
        $newCurrentPage.after('<div class="page-main page-next" aria-hidden="true"></div>'), $_loadThisPage = $(".page-main.page-current .page-toload"), $_body.hasClass("js-fromTrans") || (window.scrollTo(0, 0), $("html,body").scrollTop(0)), onStartPageWhenRefresh(!1), $newCurrentPage.attr("style", ""), $.doTimeout(100, function() {
            $("#header-main").attr("style", ""), $("#header-main h1 .logo .logo-svg .logo-path").attr("style", "")
        })
    })
} //end function
/********************************************************************************************
 **                                                                                       **
     =START EACH PAGE - refresh or ajax
 **                                                                                       **
*********************************************************************************************/
function onStartPageWhenRefresh(byRefresh) {
    byRefresh ? (
        // :BUG CHROME: even wit this is not scrolling top is some section, needed hack after preloading with animate
        window.scrollTo(0, 0), $("html,body").scrollTop(0),
        //
        $("html,body").addClass("fixed-all"), $_loadingPage.addClass("js-loading-page"), $_body.removeClass("js-byrefresh"), manageBodyClasses(), $_toPreload.imagesLoaded(function($images, $proper, $broken) {
            var fPreload = $(this).imagesLoaded();
            fPreload.always(function() {
                // $("html,body").animate({
                //     scrollTop: 0
                // }, 100); // :BUG CHROME: 100ms is arbitrary
                // if browser does not suport object-fit: cover
                if ($(".page-current .home-page").length && $_body.addClass("home"), $_html.hasClass("no-object-fit") && !$_html.hasClass("edge") && !$_html.hasClass("ie")) {
                    var $element = $(".page-current .element-cover");
                    resizeLikeCover($element)
                }
                TweenMax.to($_loadingPage, .6, {
                    opacity: 0,
                    ease: Power2.easeInOut,
                    onComplete: function() {
                        $("html,body").removeClass("fixed-all"), $_loadingPage.removeClass("js-loading-page").hide(), onStartPage()
                    }
                })
            })
        })) : onStartPage()
} //////end function
/*-------------------------------------------------------------------------------------------
    =STARTPAGE - EACH PAGE - call of functions and events
--------------------------------------------------------------------------------------------*/
function onStartPage() {
    var do_home, do_archive_formacao, do_single_formacao, do_consulta, do_contacto, do_inscricao, do_marcar_consulta, do_sobre, do_404;
    // ** =ALLOW user load other pages
    _global_allowNavigate = !0, TweenMax.to($(".page-toload"), .5, {
            opacity: 1
        }),
        // ** =REMOVE classes of loading (if needed)
        $("html,body").removeClass("fixed-all"), $_body.removeClass("js-loading-page"),
        // ** =HOME
        do_home = !!$(".page-current .home-page").length, homePage(do_home),
        // ** =ARCHIVE FORMAÇÃO
        do_archive_formacao = !!$(".page-current .archive-formacao-page").length, archiveFormacaoPage(do_archive_formacao),
        // ** =SINGLE FORMAÇÃO
        do_single_formacao = !!$(".page-current .single-formacao-page").length, singleFormacaoPage(do_single_formacao),
        // ** =CONSULTAS
        do_consulta = !!$(".page-current .consultas-page").length, consultasPage(do_consulta),
        // ** =CONTACTOS
        do_contacto = !!$(".page-current .contactos-page").length, contactosPage(do_contacto),
        // ** =INSCRIÇÃO
        do_inscricao = !!$(".page-current .inscricao-page").length, inscricaoPage(do_inscricao),
        // ** =MARCAR CONSULTA
        do_marcar_consulta = !!$(".page-current .marcar-consulta-page").length, marcarConsultaPage(do_marcar_consulta),
        // ** =SOBRE
        do_sobre = !!$(".page-current .sobre-page").length, sobrePage(do_sobre),
        // ** =404
        do_404 = !!$(".page-current .four-o-four-page").length, errorPage(do_404);
    // ** =scrolling events
    //whenScrolling(true);
    // ** =URL com ancoras onload
    var hasHash = window.location.hash;
    if ("" != hasHash) {
        var $toGoHere = $("" + hasHash);
        $.doTimeout(500, function() {
            goTo($toGoHere, 1500, [.7, 0, .3, 1], 0)
        })
    }
    // ** =RESIZE ELEMENTS LIKE BACKGROUND COVER (browser does not support object-fit: cover)
    if ($_html.hasClass("no-object-fit") && !$_html.hasClass("edge") && !$_html.hasClass("ie")) {
        var $element = $(".page-current .element-cover");
        resizeLikeCover($element)
    }
} //////end function StartPage
/** *******************************************************************************************
     =HOME
*********************************************************************************************/
function homePage(do_home) { /*page functions*/
    function initHeaderAnim(type) {
        "init" == type && TweenMax.set($header.find(".circle-btn"), {
            scale: 0,
            opacity: 1
        }), "start" == type && (TweenMax.to($header.find(".circle-btn"), 1, {
            scale: 1,
            delay: .5,
            ease: Elastic.easeOut.config(1, 1),
            onComplete: function() {
                TweenMax.set($header.find(".circle-btn"), {
                    clearProps: "scale"
                })
            }
        }), $.doTimeout(700, function() {
            $header.find(".circle-btn .arrow-down path").addClass("active")
        }))
    }

    function cardFlip(type) {
        "init" == type && (
            // CSSPlugin.defaultTransformPerspective = 1000;
            TweenMax.set($(".card-back"), {
                x: "99%"
            }),
            // return false;
            $cardWrapper.each(function(i, element) {
                var frontCard = $(this).children(".card-front"),
                    backCard = $(this).children(".card-back"),
                    tl = new TimelineMax({
                        paused: !0
                    }),
                    card_thumb = {},
                    $this = $(this);
                backCard.length <= 0 || (tl.to(frontCard, 2, {
                        x: "-100%",
                        ease: Expo.easeInOut,
                        delay: .1
                    }).to(backCard, 2, {
                        x: "0%",
                        ease: Expo.easeInOut
                    }, 0),
                    // .to(element, .5, {z:50},0)
                    // .to(element, .5, {z:0},.5);
                    card_thumb.element = $this, $this[0].animation = tl, element.animation = tl, card_flip_array.elements.push(card_thumb))
            }))
    }

    function headerAnim(type) {
        "init" == type && ($_html.hasClass("mobile") ? TweenMax.set($circlesContainer.find(".circle"), {
            autoAlpha: 0
        }) : TweenMax.set($circlesContainer.find(".circle"), {
            scale: .4,
            autoAlpha: 0
        }), TweenMax.set($circlesContainer, {
            autoAlpha: 1
        }), TweenMax.set([$header.find(".first-image"), $header.find(".second-image"), $header.find(""), $header.find("")], {
            autoAlpha: 0,
            scale: .9
        })), "start" == type && home_header_timeline.play()
    }

    function headerTweens(type) {
        "init" == type && home_header_timeline.to($header.find(".row"), .5, {
            autoAlpha: 1
        }, 0).to($header.find(".circles-container"), .5, {
            autoAlpha: 1
        }, 0).staggerTo($circlesContainer.find(".first").find(".circle"), 2, {
            scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 0).to($header.find(".first-image"), .5, {
            autoAlpha: 1,
            scale: 1
        }, .6).staggerTo($header.find(".first-title span"), .05, {
            autoAlpha: 1
        }, .1, 0).to($header.find(".first-title .underline"), .5, {
            x: "-20px"
        }, 1).staggerTo($circlesContainer.find(".first").find(".circle"), 2, {
            scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.5, 3).staggerTo($circlesContainer.find(".second").find(".circle"), 2, {
            scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 5).to($header.find(".first-image"), .5, {
            autoAlpha: 0,
            scale: .9
        }, 4).to($header.find(".second-image"), .5, {
            autoAlpha: 1,
            scale: 1
        }, 5.5).staggerTo($header.find(".second-title span"), .05, {
            autoAlpha: 1
        }, .1, 5).to($header.find(".first-title .underline"), .5, {
            x: "100%"
        }, 6).to($header.find(".second-title .underline"), .5, {
            x: "-20px"
        }, 6).staggerTo($circlesContainer.find(".second").find(".circle"), 2, {
            scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.3, 8).staggerTo($circlesContainer.find(".third").find(".circle"), 2, {
            scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 10).to($header.find(".second-image"), .5, {
            autoAlpha: 0,
            scale: .9
        }, 9.5).to($header.find(""), .5, {
            autoAlpha: 1,
            scale: 1
        }, 10.5).staggerTo($header.find(".third-title span"), .05, {
            autoAlpha: 1
        }, .1, 10).to($header.find(".second-title .underline"), .5, {
            x: "100%"
        }, 11).to($header.find(".third-title .underline"), .5, {
            x: 0
        }, 11).staggerTo($circlesContainer.find(".third").find(".circle"), 2, {
            scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.3, 13).staggerTo($circlesContainer.find(".fourth").find(".circle"), 2, {
            scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 15).to($header.find(""), .5, {
            autoAlpha: 0,
            scale: .9
        }, 14.5).to($header.find(""), .5, {
            autoAlpha: 1,
            scale: 1
        }, 15.5).staggerTo($header.find(".fourth-title span"), .05, {
            autoAlpha: 1
        }, .1, 15).to($header.find(".third-title .underline"), .5, {
            x: "100%"
        }, 15.5).to($header.find(".fourth-title .underline"), .5, {
            x: "40px"
        }, 15.5).staggerTo($circlesContainer.find(".fourth").find(".circle"), 2, {
            scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.3, 20).to($header.find(""), .5, {
            autoAlpha: 0,
            scale: .9
        }, 21.5).to($header.find(".row"), .5, {
            autoAlpha: 0
        }, 22)
    }

    function headerTweensMobile(type) {
        "init" == type && home_header_timeline.to($header.find(".row"), .5, {
            autoAlpha: 1
        }, 0).to($header.find(".circles-container"), .5, {
            autoAlpha: 1
        }, 0).staggerTo($circlesContainer.find(".first").find(".circle"), 2, {
            // scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 0).to($header.find(".first-image"), .5, {
            autoAlpha: 1
        }, .6).staggerTo($header.find(".first-title span"), .05, {
            autoAlpha: 1
        }, .1, 0).to($header.find(".first-title .underline"), .5, {
            x: "-20px"
        }, 1).staggerTo($circlesContainer.find(".first").find(".circle"), 2, {
            // scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.5, 3).staggerTo($circlesContainer.find(".second").find(".circle"), 2, {
            // scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 5).to($header.find(".first-image"), .5, {
            autoAlpha: 0
        }, 4.5).to($header.find(".second-image"), .5, {
            autoAlpha: 1
        }, 5.5).staggerTo($header.find(".second-title span"), .05, {
            autoAlpha: 1
        }, .1, 5).to($header.find(".first-title .underline"), .5, {
            x: "100%"
        }, 6).to($header.find(".second-title .underline"), .5, {
            x: "-20px"
        }, 6).staggerTo($circlesContainer.find(".second").find(".circle"), 2, {
            // scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.3, 8).staggerTo($circlesContainer.find(".third").find(".circle"), 2, {
            // scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 10).to($header.find(".second-image"), .5, {
            autoAlpha: 0
        }, 9.5).to($header.find(".third-image"), .5, {
            autoAlpha: 1
        }, 10.5).staggerTo($header.find(".third-title span"), .05, {
            autoAlpha: 1
        }, .1, 10).to($header.find(".second-title .underline"), .5, {
            x: "100%"
        }, 11).to($header.find(".third-title .underline"), .5, {
            x: 0
        }, 11).staggerTo($circlesContainer.find(".third").find(".circle"), 2, {
            // scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.3, 13).staggerTo($circlesContainer.find(".fourth").find(".circle"), 2, {
            // scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut.config(1, 1)
        }, .3, 15).to($header.find(""), .5, {
            autoAlpha: 0
        }, 14.5).to($header.find(""), .5, {
            autoAlpha: 1
        }, 15.5).staggerTo($header.find(".fourth-title span"), .05, {
            autoAlpha: 1
        }, .1, 15).to($header.find(".third-title .underline"), .5, {
            x: "100%"
        }, 15.5).to($header.find(".fourth-title .underline"), .5, {
            x: "40px"
        }, 15.5).staggerTo($circlesContainer.find(".fourth").find(".circle"), 2, {
            // scale: .5,
            autoAlpha: 0,
            ease: Elastic.easeIn.config(1, .75)
        }, -.3, 20).to($header.find(""), .5, {
            autoAlpha: 0
        }, 21.5).to($header.find(".row"), .5, {
            autoAlpha: 0
        }, 22)
    }

    function scrollTweens() {
        0 == window.pageYOffset ? ($jsAnimUpGroup.each(function() {
            var $this = $(this);
            TweenMax.set($this.children(), {
                y: "50px",
                opacity: 0
            })
        }), $jsAnimUp.each(function() {
            var $this = $(this);
            TweenMax.set($this, {
                y: "50px",
                opacity: 0
            })
        }), $jsAnimReveal.each(function() {
            var $this = $(this);
            if ("left" == $this.attr("data-from")) var offset_x = "100px",
                offset_y = "0px";
            if ("right" == $this.attr("data-from")) var offset_x = "-100px",
                offset_y = "0px";
            if ("top" == $this.attr("data-from")) var offset_y = "100px",
                offset_x = "0px";
            if ("down" == $this.attr("data-from")) var offset_y = "-100px",
                offset_x = "0px";
            TweenMax.set($this, {
                x: offset_x,
                y: offset_y,
                opacity: 0
            })
        }), $jsMaskDownWrapper.each(function() {
            var $this = $(this),
                $mask = $("<span class='mask-bg'></span>");
            $mask.css({
                display: "block",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                "background-color": "#ffffff"
            }), $this.find(".js-mask-down").append($mask)
        }), TweenMax.set($formItemFake, {
            y: "100px"
        })) : ($jsMaskDownWrapper.addClass("js-animated"), $jsAnimReveal.addClass("js-animated active"))
    } /*Animation Loop*/
    function homePage_scroll() {
        _raf_loop_id = _rAF_loop(homePage_scroll_rAF)
    }

    function homePage_scroll_rAF() {
        // Avoid calculations if not needed
        if ($pageScrollHeader = $(".page-scroll-header"), lastPosition != window.pageYOffset) {
            if (window.pageYOffset > lastPosition ? direction = "down" : direction = "up", lastPosition = window.pageYOffset, lastPosition > 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active")), lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active")), verge.inY($header) ? home_header_timeline.play() : home_header_timeline.pause(), verge.inY($imageHero, -$imageHero.height() / 2) && !$imageHero.hasClass("anim-in-focus") && ($imageHero.addClass("anim-in-focus"), TweenMax.fromTo($imageHero.find(".focus"), 1.2, {
                    scale: 0,
                    ease: Elastic.easeOut.config(1, 1)
                }, {
                    scale: 1.5,
                    ease: Elastic.easeOut.config(1, 1)
                })), $jsAnimUpGroup.each(function() {
                    var $this = $(this);
                    $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.children(), 1, {
                        y: 0,
                        opacity: 1,
                        ease: Power2.easeOut
                    }, .2))
                }), $jsAnimUp.each(function() {
                    var $this = $(this);
                    $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this, 1, {
                        y: 0,
                        opacity: 1,
                        ease: Power2.easeOut
                    }, .2))
                }), $jsAnimReveal.each(function() {
                    var $this = $(this);
                    $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated active"), TweenMax.staggerTo($this, 1, {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        ease: Expo.easeOut
                    }, .2))
                }), verge.inY($formItemFake, -100)) {
                if ($formItemFake.hasClass("js-animated")) return;
                TweenMax.to($formItemFake, 1, {
                    y: "0px",
                    ease: Expo.easeOut
                }), $formItemFake.addClass("js-animated")
            }
            $jsMaskDownWrapper.each(function() {
                var $this = $(this);
                $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.find(".mask-bg"), 1, {
                    y: "100%",
                    ease: Circ.easeInOut
                }, .1))
            })
        }
    }
    if (!do_home) return $_body.removeClass("home"), $.doTimeout("home-cards-loop"), $_window.off("resize.homePage"), $_window.off("orientationchange.homePage"), $_window.off("scroll.homePage"), !1;
    // $_window.on("resize.homePage", $.debounce(50, homePage_resize) );
    // $_window.on("orientationchange.homePage", homePage_orientationChange );
    $_window.on("scroll.homePage", homePage_scroll), $_body.addClass("home");
    var lastPosition = -1,
        $circlesContainer = $(".circles-container"),
        $header = $(".page-header"),
        $cardWrapper = $(".card-wrapper"),
        card_flip_array = {
            elements: []
        },
        home_header_timeline = new TimelineMax({
            paused: !0,
            repeat: -1
        }),
        $jsAnimUpGroup = $(".js-anim-up-group"),
        $jsAnimUp = $(".js-anim-up"),
        $jsAnimReveal = $(".js-anim-reveal"),
        $jsMaskDownWrapper = $(".js-mask-down-wrapper"),
        $imageHero = $(".imagehero"),
        $heroLink = $(".consultas-section a"),
        $formItemFake = $(".form-item");
    // if( $_body.hasClass('home') && window.innerWidth <= 1024 ){
    //   $('.formacao-list-container a').last().hide();
    // }
    // else{
    //   $('.formacao-list-container a').last().show();
    // }
    /*init functions*/
    $_body.hasClass("mobile") ? headerTweensMobile("init") : headerTweens("init"), headerAnim("init"), initHeaderAnim("init"), initHeaderAnim("start"),
        // if(_globalViewportW < 414) {
        //   $(".tutor-plus").text("+" + $(".tutor-plus").attr("data-numberMobile"));
        // }
        // else {
        //   $(".tutor-plus").text("+" + $(".tutor-plus").attr("data-number"));
        // }
        // else{
        //   headerTweensMobile("init");
        //   headerAnimMobile("init");
        //   initHeaderAnimMobile("init");
        //   initHeaderAnimMobile("start");
        // }
        cardFlip("init"), pressAnime(), scrollTweens(), avatarDisposal(), $.doTimeout(500, function() {
            headerAnim("start"), cardFlip("start")
        }), /*events*/
        $heroLink.on("mouseenter", function(e) {
            var $this = $(this);
            $this.closest(".row").find(".focus").css("z-index", "0")
        }).on("mouseleave", function(e) {
            var $this = $(this);
            $this.closest(".row").find(".focus").css("z-index", "1")
        })
} //////end function homePage
/** *******************************************************************************************
     =ARCHIVE FORMAÇÃO
*********************************************************************************************/
//function archiveFormacaoPage(do_archive_formacao) { /*Functions*/
//    function initHeaderAnim(type) {
//        "init" == type && (TweenMax.set($pageHeader.find("h2"), {
//                opacity: 0,
//                y: "50px"
//            }), TweenMax.set($pageHeader.find("li"), {
//                opacity: 0,
//                y: "50px"
//            }), TweenMax.set($pageHeader.find(".arrow"), {
//                opacity: 0,
//                y: "50px"
//            }), TweenMax.set($pageHeader.find(".circle-btn"), {
//                scale: 0,
//                opacity: 1
//            }), /*Mobile Course picker*/
//            $_body.hasClass("mobile") && (
//                //$inactive.find("li.active a").attr("data-forceRemote", "false");
//                //$('.courses-picker-mobile > li a').attr("data-forceRemote", "true");
//                $(".courses-picker-mobile li.first-in-list").remove().appendTo($inactive), $inactive.find(".active").remove().prependTo(".courses-picker-mobile"))), "start" == type && (TweenMax.staggerTo($pageHeader.find("h2"), 1, {
//            opacity: 1,
//            y: "0px",
//            ease: Circ.easeOut
//        }, .1), TweenMax.staggerTo($pageHeader.find("ul li"), 1, {
//            opacity: 1,
//            y: "0px",
//            ease: Circ.easeOut
//        }, .2), TweenMax.to($pageHeader.find(".arrow"), 1, {
//            opacity: 1,
//            y: "0px",
//            delay: .8,
//            ease: Circ.easeOut
//        }, .2), TweenMax.to($pageHeader.find(".circle-btn"), 1, {
//            scale: 1,
//            delay: .5,
//            ease: Elastic.easeOut.config(1, 1),
//            onComplete: function() {
//                TweenMax.set($pageHeader.find(".circle-btn"), {
//                    clearProps: "scale"
//                })
//            }
//        }), $.doTimeout(700, function() {
//            $pageHeader.find(".circle-btn .arrow-down path").addClass("active")
//        }))
//    }
//
//    function initContentAnim() {
//        return !$_html.hasClass("mobile") && (TweenMax.set($formacaoListItem.find(".background-obj"), {
//            y: "100%"
//        }), void $formacaoListItem.each(function(index) {
//            var $this = $(this);
//            verge.inY($this) || TweenMax.set($formacaoListItem, {
//                opacity: 0,
//                y: "80px"
//            })
//        }))
//    }
//
//    function archiveFormacaoPage_resize() {
//        _globalViewportW < 414 ? $(".tutor-plus").each(function() {
//            var $this = $(this);
//            $this.text("+" + $this.attr("data-numberMobile"))
//        }) : $(".tutor-plus").each(function() {
//            var $this = $(this);
//            $this.text("+" + $this.attr("data-number"))
//        })
//    }
//
//    function archiveFormacaoPage_orientationChange() {
//        _globalViewportW < 414 ? $(".tutor-plus").each(function() {
//            var $this = $(this);
//            $this.text("+" + $this.attr("data-numberMobile"))
//        }) : $(".tutor-plus").each(function() {
//            var $this = $(this);
//            $this.text("+" + $this.attr("data-number"))
//        })
//    }
//
//    function archiveFormacaoPage_scroll() {
//        _raf_loop_id = _rAF_loop(archiveFormacaoPage_scroll_rAF)
//    }
//
//    function archiveFormacaoPage_scroll_rAF() {
//        // Avoid calculations if not needed
//        lastPosition != window.pageYOffset && (window.pageYOffset > lastPosition ? (direction = "down", _scroll_direction = "down") : (direction = "up", _scroll_direction = "up"), lastPosition = window.pageYOffset, $_html.hasClass("mobile") || $formacaoListItem.each(function(index) {
//            var $this = $(this);
//            verge.inY($this) && ($this.hasClass("js-done") || TweenMax.to($this, 2, {
//                opacity: 1,
//                y: 0,
//                ease: Power4.easeOut,
//                onComplete: function() {
//                    $this.addClass("js-done")
//                }
//            }))
//        }), $_html.hasClass("mobile") && $formacaoListItem.each(function(index) {
//            var $this = $(this),
//                trigger_val = $this[0].getBoundingClientRect().top + $this.height() / 2;
//            trigger_val <= _globalHalfViewportH && trigger_val + 50 >= _globalHalfViewportH && !$this.hasClass("js-activated") && ("down" == direction && index > 0 ? ($formacaoListItem.eq(index - 1).removeClass("js-activated"), $formacaoListItem.eq(index - 1).trigger("mouseleave")) : "up" == direction && index < $formacaoListItem.length && ($formacaoListItem.eq(index + 1).removeClass("js-activated"), $formacaoListItem.eq(index + 1).trigger("mouseleave")), $this.addClass("js-activated"), $this.trigger("mouseenter")), $this.hasClass("js-activated") && ($this[0].getBoundingClientRect().top <= 0 || $this[0].getBoundingClientRect().bottom >= _globalViewportH) && ($this.removeClass("js-activated"), $this.trigger("mouseleave"))
//        }), lastPosition > 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active"))), lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active"))
//    }
//    if (!do_archive_formacao) return $_body.removeClass("archive-formacao"), $_window.off("scroll.archiveFormacaoPage"), $_window.off("resize.archiveFormacaoPage"), $_window.off("orientationchange.archiveFormacaoPage"), !1;
//    $_window.off("scroll.archiveFormacaoPage"), $_window.on("scroll.archiveFormacaoPage", archiveFormacaoPage_scroll), $_window.on("resize.archiveFormacaoPage", $.debounce(50, archiveFormacaoPage_resize)), $_window.on("orientationchange.archiveFormacaoPage", archiveFormacaoPage_orientationChange), $_body.addClass("archive-formacao"); /*Variables*/
//    var $pageHeader = $(".page-header"),
//        $formacaoFilterLink = ($(".page-content"), $(".courses-picker a")),
//        $formacaoListItem = ($(".courses-picker-mobile>li>a"), $(".courses-picker-mobile .inactive li a"), $(".formacao-list-container a"), $(".formacao-list-item")),
//        $inactive = $(".inactive"),
//        $seeMore = $(".see-more"),
//        $pageScrollHeader = $(".page-scroll-header"),
//        lastPosition = -1,
//        direction = "down"; /*Initializations*/
//    initToolTips(), initHeaderAnim("init"), initHeaderAnim("start"), initContentAnim(), pressAnime(), initformacaoListEvents(), avatarDisposal(), _globalViewportW < 414 ? $(".tutor-plus").each(function() {
//            var $this = $(this);
//            $this.text("+" + $this.attr("data-numberMobile"))
//        }) : $(".tutor-plus").each(function() {
//            var $this = $(this);
//            $this.text("+" + $this.attr("data-number"))
//        }), $_loadThisPage.hasClass("tax-page") && ($seeMore.hide(), $_loadThisPage.removeClass("tax-page")), $(".courses-picker li").on("click", function() {
//            $(".see-more.open").removeClass("open")
//        }), /*Events*/
//        $(document).on("click", ".formacao-list-container a", function() {
//            var $this = $(this);
//            $this.hasClass("finished-link") || ($this.addClass("js-active-link"), $this.find(".formacao-list-item").addClass("active"))
//        }), $formacaoFilterLink.on("click", function() {
//            var $this = $(this);
//            $formacaoFilterLink.parent().removeClass("active"), $this.parent().addClass("active"), $this.hasClass("all-formacoes") && $_body.addClass("js-all-formacoes")
//        }), $(document).on("click", ".courses-picker-mobile li.active a, .courses-picker-mobile .arrow", function(ev) {
//            return $inactive.hasClass("open") ? (TweenMax.to($inactive.find("li"), 1, {
//                autoAlpha: 0,
//                y: "20px",
//                ease: Circ.easeOut
//            }, .2), TweenMax.set($inactive, {
//                autoAlpha: 0,
//                delay: .2
//            })) : ($.each($inactive.find("li"), function() {
//                TweenMax.set($(this), {
//                    autoAlpha: 0,
//                    y: "50px"
//                })
//            }), TweenMax.set($inactive, {
//                autoAlpha: 1
//            }), TweenMax.staggerTo($inactive.find("li"), 1, {
//                autoAlpha: 1,
//                y: "0px",
//                ease: Circ.easeOut
//            }, .2)), $(".inactive").hasClass("open") ? TweenMax.to($(".arrow"), .3, {
//                rotation: 0,
//                transformOrigin: "center center"
//            }) : TweenMax.to($(".arrow"), .3, {
//                rotation: 180,
//                transformOrigin: "center center"
//            }), $(".courses-picker-mobile").toggleClass("open"), $inactive.toggleClass("open"), !1
//        }), $(document).on("click", ".courses-picker-mobile .inactive li a", function(ev) {
//            var $this = $(this),
//                $inactive = $(".inactive");
//            TweenMax.to($(".arrow"), .3, {
//                    rotation: 0,
//                    transformOrigin: "center center"
//                }),
//                // $('.courses-picker-mobile .arrow').removeClass('open');
//                $(".courses-picker-mobile").removeClass("open"), $this.attr("data-forceRemote", "false"), $(".courses-picker-mobile li.active a").attr("data-forceRemote", "true"), $(".courses-picker-mobile > li").remove().insertAfter($inactive.find($this.parent())), $this.parent().remove().prependTo(".courses-picker-mobile").addClass("active"), $inactive.find("li.active").removeClass("active"), TweenMax.to($inactive.find("li"), 1, {
//                    autoAlpha: 0,
//                    y: "20px",
//                    ease: Circ.easeOut
//                }, .2), TweenMax.set($inactive, {
//                    autoAlpha: 0,
//                    delay: .2
//                }), $inactive.toggleClass("open")
//        })
//} //////end function archiveFormacaoPage
//function initformacaoListEvents() {
//    var $formacaoListItem = $(".formacao-list-item");
//    avatarDisposal(), $formacaoListItem.on("mouseenter", function(event) {
//        var $this = $(this),
//            rect = $this[0].getBoundingClientRect();
//        $this.index($formacaoListItem);
//        $this.addClass("hover"), $_html.hasClass("mobile") ? "down" == _scroll_direction ? ($this.find(".background-obj").css("opacity", 0), TweenMax.set($this.find(".background-obj"), {
//            y: "-100%",
//            onComplete: function() {
//                $this.find(".background-obj").css("opacity", 1)
//            }
//        }), TweenMax.to($this.find(".background-obj"), .5, {
//            y: "0%",
//            ease: Circ.easeInOut
//        })) : ($this.find(".background-obj").css("opacity", 0), TweenMax.set($this.find(".background-obj"), {
//            y: "100%",
//            onComplete: function() {
//                $this.find(".background-obj").css("opacity", 1)
//            }
//        }), TweenMax.to($this.find(".background-obj"), .5, {
//            y: "0%",
//            ease: Circ.easeInOut
//        })) : event.clientY <= rect.top + $this.height() ? ($this.find(".background-obj").css("opacity", 0), TweenMax.set($this.find(".background-obj"), {
//            y: "-100%",
//            onComplete: function() {
//                $this.find(".background-obj").css("opacity", 1)
//            }
//        }), TweenMax.to($this.find(".background-obj"), .5, {
//            y: "0%",
//            ease: Circ.easeInOut
//        })) : ($this.find(".background-obj").css("opacity", 0), TweenMax.set($this.find(".background-obj"), {
//            y: "100%",
//            onComplete: function() {
//                $this.find(".background-obj").css("opacity", 1)
//            }
//        }), TweenMax.to($this.find(".background-obj"), .5, {
//            y: "0%",
//            ease: Circ.easeInOut
//        }))
//    }).on("mouseleave", function(event) {
//        var $this = $(this),
//            rect = $this[0].getBoundingClientRect();
//        $this.removeClass("hover"), $formacaoListItem.removeClass("no-border"), $_html.hasClass("mobile") ? "up" == _scroll_direction ? TweenMax.to($this.find(".background-obj"), .3, {
//            y: "-100%",
//            ease: Circ.easeInOut
//        }) : TweenMax.to($this.find(".background-obj"), .3, {
//            y: "100%",
//            ease: Circ.easeInOut
//        }) : event.clientY <= rect.top + $this.height() ? TweenMax.to($this.find(".background-obj"), .3, {
//            y: "-100%",
//            ease: Circ.easeInOut
//        }) : TweenMax.to($this.find(".background-obj"), .3, {
//            y: "100%",
//            ease: Circ.easeInOut
//        })
//    })
//}
/** *******************************************************************************************
     =SINGLE FORMAÇÃO
*********************************************************************************************/
function singleFormacaoPage(do_single_formacao) { /*events*/
    /*******************************************************************************************
     **                                                                                       **
        =SLIDESHOWS PLUGIN SLICK
        only if i have more then 4 elements
     **                                                                                       **
    *********************************************************************************************/
//    function slideshow_slick() {
//        var $slideObg = $(".slideshow-slick");
//        return !!$slideObg.length && void $slideObg.each(function() {
//            var $this = $(this);
//            $this.hasClass("testemonials-list") && (
//                    // On before slide change
//                    $this.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
//                        var $image_current = (slick.$slides[nextSlide], slick.$slides[currentSlide], $(this).find("[data-slick-index='" + currentSlide + "']").find("span")),
//                            $image = $(this).find("[data-slick-index='" + nextSlide + "']").find("span");
//                        currentSlide != nextSlide && $image_current.removeClass("on"), 0 == nextSlide && currentSlide == slick.slideCount - 1 ? (
//                            //Looping right
//                            $this.addClass("right-anim").removeClass("left-anim"), $image.addClass("on")) : nextSlide == slick.slideCount - 1 && 0 == currentSlide ? (
//                            //Looping left
//                            $this.addClass("left-anim").removeClass("right-anim"), $image.addClass("on")) : (
//                            //Navigating
//                            currentSlide < nextSlide && ($this.addClass("right-anim").removeClass("left-anim"), $image.addClass("on")), currentSlide > nextSlide && ($this.addClass("left-anim").removeClass("right-anim"), $image.addClass("on"))), $.doTimeout(600, function() {
//                            $this.removeClass("left-anim right-anim")
//                        })
//                    }),
//                    // $this.on('afterChange', function(event, slick, currentSlide){
//                    //   var $image = $this.find("[data-slick-index='" + currentSlide + "']").find("span");
//                    //   $image.addClass("on");
//                    // });
//                    $this.on("init", function(event, slick) {
//                        var $image = $this.find(".slick-current").find("span");
//                        $image.addClass("on")
//                    })), $this.slick({
//                    centerMode: !0,
//                    centerPadding: "260px",
//                    draggable: !1,
//                    infinite: !1,
//                    speed: 600,
//                    autoplay: !1,
//                    autoplaySpeed: 4e3,
//                    useCSS: !0,
//                    cssEase: "cubic-bezier(0.76, 0, 0.18, 1)",
//                    dots: !0,
//                    arrows: !1,
//                    slidesToShow: 1,
//                    slidesToScroll: 1,
//                    responsive: [{
//                        breakpoint: 1280,
//                        settings: {
//                            centerPadding: "200px"
//                        }
//                    }, {
//                        breakpoint: 1120,
//                        settings: {
//                            centerPadding: "120px"
//                        }
//                    }, {
//                        breakpoint: 1e3,
//                        settings: {
//                            centerPadding: "0px"
//                        }
//                    }]
//                }), //end plugin
//                /* Events for next/prev on borders of slides*/
//                $this.find(".prev-slide").on("click", function() {
//                    $this.slick("slickNext"), $this.slick("slickPause")
//                }), $this.find(".next-slide").on("click", function() {
//                    $this.slick("slickPrev"), $this.slick("slickPause")
//                })
//        })
//    } /*functions*/
    function scrollTweens() {
        0 == window.pageYOffset && (TweenMax.set($tutorsList.find(".tutor-img"), {
            scale: 0
        }), TweenMax.set([$tutorsList.find("p"), $tutorsList.find("a")], {
            opacity: 0,
            y: "50px"
        }))
    }

    function initHeaderAnim(type) {
        "init" == type && (TweenMax.set($pageHeader.find(".circle-btn"), {
            scale: 0,
            opacity: 1
        }), $_body.hasClass("js-no-ajax") ? TweenMax.set([$pageHeader.find("h2"), $pageHeader.find(".upper-subtitle")], {
            opacity: 0,
            y: "40px"
        }) : TweenMax.set([$pageHeader.find(".upper-subtitle")], {
            opacity: 0,
            y: "40px"
        }), TweenMax.set($pageHeader.find(".btn"), {
            opacity: 0,
            y: "40px"
        }), TweenMax.set($courseSpecs, {
            y: "100px",
            opacity: 0
        }), TweenMax.set($controllers.find("li"), {
            opacity: 0,
            x: "20px"
        })), "start" == type && (TweenMax.to($pageHeader.find(".circle-btn"), 1, {
                scale: 1,
                delay: .5,
                ease: Elastic.easeOut.config(1, 1),
                onComplete: function() {
                    TweenMax.set($pageHeader.find(".circle-btn"), {
                        clearProps: "scale"
                    })
                }
            }), $pageHeader.find(".btn").hasClass("esgotado") ? TweenMax.to($pageHeader.find(".btn"), 1, {
                opacity: .5,
                y: "0px",
                ease: Expo.easeOut
            }) : TweenMax.to($pageHeader.find(".btn"), 1, {
                opacity: 1,
                y: "0px",
                ease: Expo.easeOut
            }),
            // if($_body.hasClass("js-no-ajax"))
            TweenMax.to([$pageHeader.find("h2:not(.inscricao-page-first-title)"), $pageHeader.find(".upper-subtitle")], 1, {
                opacity: 1,
                y: 0,
                ease: Expo.easeOut
            }), TweenMax.staggerTo($courseSpecs, 2, {
                y: "0px",
                opacity: 1,
                ease: Expo.easeOut
            }, .1), $.doTimeout(700, function() {
                $pageHeader.find(".circle-btn .arrow-down path").addClass("active")
            }))
    }

    function initContentAnim() {
        return !$_html.hasClass("mobile") && (TweenMax.set($formacaoListItem.find(".background-obj"), {
            y: "100%"
        }), void $formacaoListItem.each(function(index) {
            var $this = $(this);
            verge.inY($this) || TweenMax.set($formacaoListItem, {
                opacity: 0,
                y: "80px"
            })
        }))
    }

    function singleFormacaoPage_resize() {
        _globalViewportW < 414 ? $(".tutor-plus").each(function() {
            var $this = $(this);
            $this.text("+" + $this.attr("data-numberMobile"))
        }) : $(".tutor-plus").each(function() {
            var $this = $(this);
            $this.text("+" + $this.attr("data-number"))
        })
    }

    function singleFormacaoPage_orientationChange() {
        _globalViewportW < 414 ? $(".tutor-plus").each(function() {
            var $this = $(this);
            $this.text("+" + $this.attr("data-numberMobile"))
        }) : $(".tutor-plus").each(function() {
            var $this = $(this);
            $this.text("+" + $this.attr("data-number"))
        })
    } /*Animation Loop*/
    function singleFormacaoPage_scroll() {
        _raf_loop_id = _rAF_loop(singleFormacaoPage_scroll_rAF)
    }

    function singleFormacaoPage_scroll_rAF() {
        // Avoid calculations if not needed
        if (lastPosition != window.pageYOffset) {
            if (window.pageYOffset > lastPosition ? (direction = "down", _scroll_direction = "down") : (direction = "up", _scroll_direction = "up"), lastPosition = window.pageYOffset, $_html.hasClass("mobile") || $formacaoListItem.each(function(index) {
                    var $this = $(this);
                    verge.inY($this) && ($this.hasClass("js-done") || TweenMax.to($this, 2, {
                        opacity: 1,
                        y: 0,
                        ease: Power4.easeOut,
                        onComplete: function() {
                            $this.addClass("js-done")
                        }
                    }))
                }), verge.inY($tutorsList.find(".tutor-img"))) {
                if ($tutorsList.find(".tutor-img").hasClass("js-animated")) return;
                $tutorsList.find(".tutor-img").addClass("js-animated"), TweenMax.staggerTo($tutorsList.find(".tutor-img"), 1, {
                    scale: 1,
                    ease: Expo.easeOut
                }, .1), TweenMax.staggerTo([$tutorsList.find("p"), $tutorsList.find("a")], 1, {
                    opacity: 1,
                    y: "0px",
                    ease: Expo.easeOut
                }, .1)
            }
            $_html.hasClass("mobile") && $formacaoListItem.each(function(index) {
                var $this = $(this),
                    trigger_val = $this[0].getBoundingClientRect().top + $this.height() / 2;
                trigger_val <= _globalHalfViewportH && trigger_val + 50 >= _globalHalfViewportH && !$this.hasClass("js-activated") && ("down" == direction && index > 0 ? ($formacaoListItem.eq(index - 1).removeClass("js-activated"), $formacaoListItem.eq(index - 1).trigger("mouseleave")) : "up" == direction && index < $formacaoListItem.length && ($formacaoListItem.eq(index + 1).removeClass("js-activated"), $formacaoListItem.eq(index + 1).trigger("mouseleave")), $this.addClass("js-activated"), $this.trigger("mouseenter")), $this.hasClass("js-activated") && ($this[0].getBoundingClientRect().top <= 0 || $this[0].getBoundingClientRect().bottom >= _globalViewportH) && ($this.removeClass("js-activated"), $this.trigger("mouseleave"))
            }), $_html.hasClass("mobile") ? lastPosition > 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active"), $controllers.addClass("active"), TweenMax.staggerTo($controllers.find("li"), .8, {
                opacity: 1,
                x: "0px",
                delay: .5,
                ease: Expo.easeOut
            }, .05)) : lastPosition >= _globalViewportH && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active"), $controllers.addClass("active"), TweenMax.staggerTo($controllers.find("li"), .8, {
                opacity: 1,
                x: "0px",
                delay: .5,
                ease: Expo.easeOut
            }, .05))
        }
        $_html.hasClass("mobile") ? lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active"), $controllers.removeClass("active"), TweenMax.staggerTo($controllers.find("li"), 1, {
            opacity: 0,
            x: "10px",
            ease: Expo.easeOut
        }, .1)) : lastPosition < _globalViewportH && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active"), $controllers.removeClass("active"), TweenMax.staggerTo($controllers.find("li"), 1, {
            opacity: 0,
            x: "10px",
            ease: Expo.easeOut
        }, .1))
    }
    if (!do_single_formacao) return $_body.removeClass("single-formacao"), $_window.off("scroll.singleFormacaoPage"), $_window.off("resize.singleFormacaoPage"), $_window.off("orientationchange.singleFormacaoPage"), window.cancelAnimationFrame(_raf_loop_id), $(".testemonials-list").slick("unslick"), !1;
    $_window.off("scroll.singleFormacaoPage"), $_window.on("scroll.singleFormacaoPage", singleFormacaoPage_scroll), $_window.on("resize.singleFormacaoPage", $.debounce(50, singleFormacaoPage_resize)), $_window.on("orientationchange.singleFormacaoPage", singleFormacaoPage_orientationChange), $_body.addClass("single-formacao");
    var lastPosition = -1,
        $pageHeader = $(".page-header"),
        $inscricaoBtn = $(".page-header .btn, .page-scroll-header .btn"),
        $pageScrollHeader = $(".page-scroll-header"),
        $formacaoListItem = $(".formacao-list-item"),
        $courseSpecs = $(".course-specs .columns"),
        $controllers = $(".formacao-controllers"),
        $controllersHelper = $(".formacao-controllers .btn-to-help"),
        $targetPublic = $(".target-public"),
        $tutorsList = $(".tutors-list");
    _globalViewportW < 414 ? $(".tutor-plus").each(function() {
            var $this = $(this);
            $this.text("+" + $this.attr("data-numberMobile"))
        }) : $(".tutor-plus").each(function() {
            var $this = $(this);
            $this.text("+" + $this.attr("data-number"))
        }), /*initialization*/
        initHeaderAnim("init"), breakTitleLetters($pageHeader.find(".inscricao-page-first-title")), initHeaderAnim("start"), pressAnime(), initContentAnim(), initformacaoListEvents(), scrollTweens(), slideshow_slick(), //end function
        $(".share").on("click", function(ev) {
            var $this = $(this);
            ev.stopImmediatePropagation(), ev.preventDefault(), ev.stopPropagation(), window.open($this.attr("href"), "Google", "width=500,height=500")
        }), $inscricaoBtn.on("click", function() {
            "false" != $(this).attr("data-remote") && (TweenMax.to($pageHeader.find(".upper-subtitle"), .2, {
                opacity: 0
            }), TweenMax.set($pageHeader.find(".inscricao-page-first-title"), {
                opacity: 0,
                y: 0
            }), TweenMax.set($pageHeader.find(".inscricao-page-first-title span"), {
                opacity: 0
            }), TweenMax.set($pageHeader.find(".inscricao-page-first-title"), {
                opacity: 1
            }), TweenMax.staggerTo($pageHeader.find(".inscricao-page-first-title span"), 0, {
                opacity: 1,
                delay: .2
            }, .02))
        }), $controllersHelper.on("mouseenter", function() {
            var $this = $(this);
            TweenMax.to($this.find(".title-helper-wrapper"), .2, {
                autoAlpha: 1
            })
        }).on("mouseleave", function() {
            var $this = $(this);
            TweenMax.to($this.find(".title-helper-wrapper"), .2, {
                autoAlpha: 0
            })
        }), $_body.hasClass("mobile") ? $targetPublic.find(".view-more").on("click", function() {
            var $this = $(this),
                $targetContent = $this.parent().find(".target-public-content");
            $this.toggleClass("active"), $this.hasClass("active") ? (TweenMax.to($this, .2, {
                rotation: 45,
                scale: 1.2
            }), TweenMax.to($targetContent, .5, {
                autoAlpha: 1,
                y: "20px",
                ease: Expo.easeOut
            })) : (TweenMax.to($this, .2, {
                rotation: 0,
                scale: 1
            }), TweenMax.to($targetContent, .5, {
                autoAlpha: 0,
                y: "40px",
                ease: Expo.easeOut
            }))
        }) : $targetPublic.find(".view-more").on("mouseenter", function() {
            var $this = $(this),
                $targetContent = $this.parent().find(".target-public-content");
            $this.closest(".target-public").css("z-index", "9999"), $this.addClass("hover"), $.doTimeout(60, function() {
                return !!$this.hasClass("hover") && void(window.innerWidth >= 1430 ? TweenMax.to($targetContent, .5, {
                    autoAlpha: 1,
                    x: "20px",
                    ease: Expo.easeOut
                }) : TweenMax.to($targetContent, .5, {
                    autoAlpha: 1,
                    y: "10px",
                    ease: Expo.easeOut
                }))
            })
        }).on("mouseleave", function() {
            var $this = $(this),
                $targetContent = $this.parent().find(".target-public-content");
            $this.closest(".target-public").css("z-index", "1"), $this.removeClass("hover"), window.innerWidth >= 1430 ? TweenMax.to($targetContent, .5, {
                autoAlpha: 0,
                x: "40px",
                ease: Expo.easeOut
            }) : TweenMax.to($targetContent, .5, {
                autoAlpha: 0,
                y: "0px",
                ease: Expo.easeOut
            })
        })
} //////end function singleFormacaoPage
/** *******************************************************************************************
     =CONSULTAS
*********************************************************************************************/
//function consultasPage(do_consulta) { /*Functions*/
//    function initContentAnim() {
//        $_html.hasClass("mobile")
//    }
//
//    function scrollTweens() {
//        0 == window.pageYOffset ? ($jsMaskLeftWrapper.each(function() {
//            var $this = $(this),
//                $mask = $("<span class='mask-bg'></span>");
//            $mask.css({
//                display: "block",
//                position: "absolute",
//                width: "100%",
//                height: "100%",
//                top: 0,
//                left: 0,
//                "background-color": "#ffffff"
//            }), $this.find(".js-mask-left").append($mask)
//        }), $jsAnimUpGroup.each(function() {
//            var $this = $(this);
//            TweenMax.set($this.children(), {
//                y: "50px",
//                opacity: 0
//            })
//        }), $jsAnimUp.each(function() {
//            var $this = $(this);
//            TweenMax.set($this, {
//                y: "50px",
//                opacity: 0
//            })
//        }), $jsAnimReveal.each(function() {
//            var $this = $(this);
//            if ("left" == $this.attr("data-from")) var offset_x = "100px",
//                offset_y = "0px";
//            if ("right" == $this.attr("data-from")) var offset_x = "-100px",
//                offset_y = "0px";
//            if ("top" == $this.attr("data-from")) var offset_y = "100px",
//                offset_x = "0px";
//            if ("down" == $this.attr("data-from")) var offset_y = "-100px",
//                offset_x = "0px";
//            TweenMax.set($this, {
//                x: offset_x,
//                y: offset_y,
//                opacity: 0
//            })
//        }), TweenMax.set($formItemFake, {
//            y: "100px"
//        })) : ($jsMaskLeftWrapper.addClass("js-animated"), $jsAnimReveal.addClass("js-animated active"))
//    }
//
//    function initHeaderAnim(type) {
//        "init" == type && (TweenMax.set($pageHeader.find("h2"), {
//            opacity: 0,
//            y: "50px"
//        }), TweenMax.set($pageHeader.find(".circle-btn"), {
//            scale: 0,
//            opacity: 1
//        })), "start" == type && (TweenMax.to($pageHeader.find("h2"), 1, {
//            opacity: 1,
//            y: "0px",
//            ease: Circ.easeOut
//        }), TweenMax.to($pageHeader.find(".circle-btn"), 1, {
//            scale: 1,
//            delay: .5,
//            ease: Elastic.easeOut.config(1, 1),
//            onComplete: function() {
//                TweenMax.set($pageHeader.find(".circle-btn"), {
//                    clearProps: "scale"
//                })
//            }
//        }), $.doTimeout(700, function() {
//            $pageHeader.find(".circle-btn .arrow-down path").addClass("active")
//        }))
//    } /*Animation Loop*/
//    function consultasPage_scroll() {
//        _raf_loop_id = _rAF_loop(consultasPage_scroll_rAF)
//    }
//
//    function consultasPage_scroll_rAF() {
//        if (
//            // Avoid calculations if not needed
//            $pageScrollHeader = $(".page-scroll-header"), lastPosition != window.pageYOffset && (window.pageYOffset > lastPosition ? direction = "down" : direction = "up", lastPosition = window.pageYOffset, lastPosition > 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active")), lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active")), $imageHero.each(function() {
//                var $this = $(this);
//                verge.inY($this, -$this.height() / 2) && !$this.hasClass("anim-in-focus") && ($this.addClass("anim-in-focus"), TweenMax.fromTo($this.find(".focus"), 1.2, {
//                    scale: 0,
//                    ease: Elastic.easeOut.config(1, 1)
//                }, {
//                    scale: 1.5,
//                    ease: Elastic.easeOut.config(1, 1)
//                }))
//            }), $jsAnimUpGroup.each(function() {
//                var $this = $(this);
//                $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.children(), 1, {
//                    y: 0,
//                    opacity: 1,
//                    ease: Power2.easeOut,
//                    clearProps: "y"
//                }, .2))
//            }), $jsAnimUp.each(function() {
//                var $this = $(this);
//                $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this, 1, {
//                    y: 0,
//                    opacity: 1,
//                    ease: Power2.easeOut
//                }, .2))
//            }), $jsAnimReveal.each(function() {
//                var $this = $(this);
//                $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated active"), TweenMax.staggerTo($this, 1, {
//                    x: 0,
//                    y: 0,
//                    opacity: 1,
//                    ease: Expo.easeOut
//                }, .2))
//            }), $jsMaskLeftWrapper.each(function() {
//                var $this = $(this);
//                $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.find(".mask-bg"), 1, {
//                    y: "100%",
//                    ease: Circ.easeInOut
//                }, .1))
//            }), verge.inY($formItemFake, -100))) {
//            if ($formItemFake.hasClass("js-animated")) return;
//            TweenMax.to($formItemFake, 1, {
//                y: "0px",
//                ease: Expo.easeOut
//            }), $formItemFake.addClass("js-animated")
//        }
//    }
//    if (!do_consulta) return $_body.removeClass("consultas-page"), $_window.off("scroll.consultasPage"), !1;
//    $_body.addClass("consultas-page"), $_window.on("scroll.consultasPage", consultasPage_scroll);
//    var lastPosition = -1,
//        $pageHeader = $(".page-header"),
//        $imageHero = $(".imagehero"),
//        $heroLink = $(".hero-block a"),
//        $jsMaskLeftWrapper = $(".js-mask-left-wrapper"),
//        $jsAnimUpGroup = ($(".services"), $(".js-anim-up-group")),
//        $jsAnimUp = $(".js-anim-up"),
//        $jsAnimReveal = $(".js-anim-reveal"),
//        $formItemFake = $(".form-item"); /*Initializations*/
//    initToolTips(), initHeaderAnim("init"), initHeaderAnim("start"), pressAnime(), scrollTweens(), initContentAnim(), /*Events*/
//        $heroLink.on("mouseenter", function(e) {
//            var $this = $(this);
//            $this.closest(".row").find(".focus").css("z-index", "0")
//        }).on("mouseleave", function(e) {
//            var $this = $(this);
//            $this.closest(".row").find(".focus").css("z-index", "1")
//        }), $_body.hasClass("mobile") && $(".tooltip .tool-content a.link").on("click", function(ev) {
//            ev.stopImmediatePropagation(), ev.preventDefault(), ev.stopPropagation()
//        })
//} //////end function consultasPage
/** *******************************************************************************************
     =MARCAR CONSULTA
*********************************************************************************************/
//function marcarConsultaPage(do_marcar_consulta) {
//    function marcarConsultasPage_scroll() {
//        _raf_loop_id = _rAF_loop(marcarConsultasPage_scroll_rAF)
//    }
//
//    function marcarConsultasPage_scroll_rAF() {
//        // Avoid calculations if not needed
//        var $pageScrollHeader = $(".page-scroll-header");
//        lastPosition != window.pageYOffset && (window.pageYOffset > lastPosition ? direction = "down" : direction = "up", lastPosition = window.pageYOffset, lastPosition >= 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active")), lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active")))
//    }
//    if (!do_marcar_consulta) return $_window.off("scroll.marcarConsultaPage"), !1;
//    $_window.on("scroll.marcarConsultaPage", marcarConsultasPage_scroll);
//    var lastPosition = -1,
//        $form = $(".steps-form");
//    pressAnime(), $form.find("select option:selected").is(":disabled") || $form.find(".select-input").text($form.find("select option:selected").text()), $form.find("select").change(function() {
//        $("#consulta-id").attr("value", $form.find("select option:selected").attr("data-id"))
//    })
//} //////end function marcarConsultaPage
/** *******************************************************************************************
     =CONTACTOS
*********************************************************************************************/
//function contactosPage(do_contacto) { /*page functions*/
//    function initHeaderAnim(type) {
//        "init" == type && (TweenMax.set($pageHeader.find(".circle-btn"), {
//            scale: 0,
//            opacity: 1
//        }), TweenMax.set($pageHeader.find(".btn-wrapper-contact .small-caps"), {
//            y: 10
//        })), "start" == type && (TweenMax.to($pageHeader.find(".circle-btn"), 1, {
//            scale: 1,
//            delay: .5,
//            ease: Elastic.easeOut.config(1, 1),
//            onComplete: function() {
//                TweenMax.set($pageHeader.find(".circle-btn"), {
//                    clearProps: "scale"
//                })
//            }
//        }), TweenMax.to($pageHeader.find(".btn-wrapper-contact .small-caps"), 1, {
//            y: 0,
//            opacity: 1,
//            delay: .5,
//            ease: Elastic.easeOut.config(1, 1)
//        }), $.doTimeout(700, function() {
//            $pageHeader.find(".circle-btn .arrow-down path").addClass("active")
//        }))
//    }
//
//    function scrollTweens() {
//        0 == window.pageYOffset ? ($jsMaskDownWrapper.each(function() {
//            var $this = $(this),
//                $mask = $("<span class='mask-bg'></span>");
//            $mask.css({
//                display: "block",
//                position: "absolute",
//                width: "100%",
//                height: "100%",
//                top: 0,
//                left: 0,
//                "background-color": "#ffbb02"
//            }), $this.find(".js-mask-down").append($mask)
//        }), $jsAnimUpGroup.each(function() {
//            var $this = $(this);
//            verge.inY($this) || TweenMax.set($this.children(), {
//                y: "50px",
//                opacity: 0
//            })
//        }), $jsAnimUp.each(function() {
//            var $this = $(this);
//            verge.inY($this) || TweenMax.set($this, {
//                y: "50px",
//                opacity: 0
//            })
//        }), $jsAnimReveal.each(function() {
//            var $this = $(this);
//            if (verge.inY($this)) return void $this.addClass("js-animated active");
//            if ("left" == $this.attr("data-from")) var offset_x = "100px",
//                offset_y = "0px";
//            if ("right" == $this.attr("data-from")) var offset_x = "-100px",
//                offset_y = "0px";
//            if ("top" == $this.attr("data-from")) var offset_y = "100px",
//                offset_x = "0px";
//            if ("down" == $this.attr("data-from")) var offset_y = "-100px",
//                offset_x = "0px";
//            TweenMax.set($this, {
//                x: offset_x,
//                y: offset_y,
//                opacity: 0
//            })
//        })) : $jsMaskDownWrapper.addClass("js-animated")
//    }
//
//    function initContactForm(type, step) {
//        if ("init" == type && ($_body.addClass("js-contact-form-active"), $_html.hasClass("mobile") || $form.css("height", "200px"), breakTitleLetters($formItem.eq(0).find("h2")), $formItem.eq(0).addClass("active"), TweenMax.staggerTo($formItem.eq(0).find("h2 span"), .05, {
//                autoAlpha: 1
//            }, .03, function() {
//                "" == hasHash && ($_html.hasClass("ios") ? ($formItem.find("input").on("touchstart", function() {
//                    $(this).focus(), // inside this function the focus works
//                        focused = $(this)
//                }), $formItem.eq(0).find("input").trigger("touchstart")) : $formItem.eq(0).find("input").focus())
//            })), "start" == type) {
//            var $activeItem = $(".form-item-container.active"),
//                active_step = ($(".form-item-container.visible"), $activeItem.attr("data-step"));
//            if (active_step == step) return;
//            if (1 == step &&
//                //need to print username
//                $formItem.eq(step).find(".username").text($activeItem.find("input").attr("value").split(" ")[0]), 2 == step && $formItem.eq(active_step).find("input").attr("value", $(".textarea-input").text()), 3 == step) return TweenMax.to(window, 1.5, {
//                scrollTo: {
//                    y: $(window).scrollTop() + 200
//                },
//                ease: Power4.easeOut
//            }), TweenMax.to($sendContactForm, .5, {
//                scale: 1,
//                ease: Expo.easeOut
//            }), TweenMax.to($goDownBtn, .5, {
//                scale: 0,
//                ease: Expo.easeOut
//            }), !1;
//            breakTitleLetters($formItem.eq(step).find("h2")), $formItem.eq(active_step).find("input").blur(),
//                //Erase Active Input
//                TweenMax.to($formItem.eq(active_step), .2, {
//                    opacity: .6,
//                    ease: Expo.easeOut,
//                    onComplete: function() {
//                        //Activate "Step" Input
//                        var item_size = $formItem.eq(active_step).height() + 100;
//                        $activeItem.removeClass("active").addClass("visible"), $formItem.eq(step).addClass("active"), TweenMax.to(window, 1.5, {
//                            scrollTo: {
//                                y: $(window).scrollTop() + item_size
//                            },
//                            ease: Power4.easeOut
//                        }), active_step < 2 && TweenMax.to($form, 1.5, {
//                            height: "+=" + item_size,
//                            ease: Power4.easeOut
//                        }), TweenMax.staggerTo($formItem.eq(step).find("h2 span"), .05, {
//                            autoAlpha: 1
//                        }, .03, function() {
//                            $formItem.eq(step).find(".user-action").focus()
//                        })
//                    }
//                })
//        }
//    }
//
//    function initMap() {
//        var map_style = [{
//                featureType: "all",
//                elementType: "all",
//                stylers: [{
//                    hue: "#00aaff"
//                }, {
//                    saturation: "-100"
//                }, {
//                    gamma: "2.15"
//                }, {
//                    lightness: "12"
//                }]
//            }, {
//                featureType: "all",
//                elementType: "labels",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "all",
//                elementType: "labels.text",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "all",
//                elementType: "labels.text.fill",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "all",
//                elementType: "labels.text.stroke",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "all",
//                elementType: "labels.icon",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "administrative",
//                elementType: "geometry.fill",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "administrative",
//                elementType: "geometry.stroke",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "landscape",
//                elementType: "labels",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "poi",
//                elementType: "all",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "poi",
//                elementType: "labels",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "poi",
//                elementType: "labels.text",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "poi",
//                elementType: "labels.text.fill",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "poi",
//                elementType: "labels.text.stroke",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "road",
//                elementType: "geometry",
//                stylers: [{
//                    lightness: 57
//                }]
//            }, {
//                featureType: "road",
//                elementType: "labels.text",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "road",
//                elementType: "labels.text.fill",
//                stylers: [{
//                    visibility: "off"
//                }, {
//                    lightness: 24
//                }]
//            }, {
//                featureType: "road",
//                elementType: "labels.text.stroke",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "road",
//                elementType: "labels.icon",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "road.highway",
//                elementType: "geometry",
//                stylers: [{
//                    lightness: "86"
//                }, {
//                    visibility: "on"
//                }]
//            }, {
//                featureType: "transit",
//                elementType: "labels",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }, {
//                featureType: "water",
//                elementType: "labels",
//                stylers: [{
//                    visibility: "off"
//                }]
//            }],
//            myLatlng = new google.maps.LatLng(40.2049654, -8.4264305),
//            w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
//            isDraggable = w > 1024,
//            map = new google.maps.Map(document.getElementById("map"), {
//                center: myLatlng,
//                scrollwheel: !1,
//                zoom: 16,
//                draggable: isDraggable,
//                styles: map_style,
//                disableDefaultUI: !0
//            });
//        $(window)[0].innerWidth <= 414 && map.panBy(0, -60);
//        var marker = new google.maps.Marker({
//            position: myLatlng,
//            title: "Psikontacto"
//        });
//        //marker.setMap(map);
//        google.maps.event.addListenerOnce(map, "idle", function() {
//            positionServiceDetail(marker, map), TweenMax.to($(".map-marker"), .2, {
//                opacity: 1
//            })
//        }), google.maps.event.addListener(map, "center_changed", function(event) {
//            positionServiceDetail(marker, map)
//        }), google.maps.event.addListener(map, "zoom_changed", function(event) {
//            positionServiceDetail(marker, map)
//        })
//    }
//
//    function positionServiceDetail(marker, map) {
//        var $serviceDetail = $(".map-marker"),
//            latLng = marker.getPosition(),
//            topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast()),
//            bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest()),
//            scale = Math.pow(2, map.getZoom()),
//            worldPoint = map.getProjection().fromLatLngToPoint(latLng),
//            point = new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
//        $serviceDetail.css({
//            top: point.y - 75,
//            left: point.x - 30
//        })
//    } /*Animation Loop*/
//    function contactosPage_scroll() {
//        _raf_loop_id = _rAF_loop(contactosPage_scroll_rAF)
//    }
//
//    function contactosPage_scroll_rAF() {
//        var $pageScrollHeader = $(".page-scroll-header");
//        // Avoid calculations if not needed
//        lastPosition != window.pageYOffset && (window.pageYOffset > lastPosition ? direction = "down" : direction = "up", lastPosition = window.pageYOffset, 0 != lastPosition ? (TweenMax.to($pageHeader.find(".circle-btn"), 1, {
//            scale: 0,
//            ease: Elastic.easeOut.config(1, 1)
//        }), TweenMax.to($pageHeader.find(".btn-wrapper-contact .small-caps"), 1, {
//            y: 10,
//            opacity: 0,
//            ease: Elastic.easeOut.config(1, 1)
//        }), $.doTimeout(700, function() {
//            $pageHeader.find(".circle-btn .arrow-down path").removeClass("active")
//        })) : $formItem.hasClass("visible") || (initHeaderAnim("start"), $formItem.eq(0).find("input").focus()), lastPosition > 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active")), lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active")), $jsAnimUpGroup.each(function() {
//            var $this = $(this);
//            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.children(), 1, {
//                y: 0,
//                opacity: 1,
//                ease: Power2.easeOut
//            }, .2))
//        }), $jsAnimUp.each(function() {
//            var $this = $(this);
//            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this, 1, {
//                y: 0,
//                opacity: 1,
//                ease: Power2.easeOut
//            }, .2))
//        }), $jsAnimReveal.each(function() {
//            var $this = $(this);
//            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated active"), TweenMax.staggerTo($this, 1, {
//                x: 0,
//                y: 0,
//                opacity: 1,
//                ease: Expo.easeOut
//            }, .2))
//        }), $jsMaskDownWrapper.each(function() {
//            var $this = $(this);
//            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.find(".mask-bg"), 1, {
//                y: "100%",
//                ease: Circ.easeInOut
//            }, .1))
//        }))
//    }
//    if (!do_contacto) return $_body.removeClass("contactos-page"), $_body.removeClass("js-contact-form-active"), $_window.off("scroll.contactosPage"), !1;
//    $_body.addClass("contactos-page"), $_window.on("scroll.contactosPage", contactosPage_scroll);
//    var lastPosition = -1,
//        hasHash = window.location.hash,
//        $header = $(".page-header"),
//        $pageHeader = $(".page-header"),
//        $goDownBtn = $header.find(".go-down"),
//        $form = $("#contact-form"),
//        $formItem = $("#contact-form .form-item-container"),
//        $formStepButton = $formItem.find("button"),
//        $sendContactForm = $(".send-contact-form"),
//        $jsMaskDownWrapper = $(".js-mask-down-wrapper"),
//        $formHelper = $(".contact-form-helper"),
//        $jsAnimUpGroup = $(".js-anim-up-group"),
//        $jsAnimUp = $(".js-anim-up"),
//        $jsAnimReveal = $(".js-anim-reveal"); /*Init Functions*/
//    initHeaderAnim("init"), initHeaderAnim("start"), initMap(), pressAnime(), scrollTweens(), $_html.hasClass("mobile") || (initContactForm("init"), $.doTimeout(2e3, function() {
//            initContactForm("start", 0)
//        })), /*events*/
//        $formItem.find("input, .textarea-input").on("keydown", function() {
//            var $this = $(this),
//                $thisItem = $this.parent();
//            $thisItem.find(".contact-form-helper").hasClass("js-visible") || TweenMax.to($thisItem.find(".contact-form-helper"), .5, {
//                scale: 1,
//                ease: Expo.easeOut,
//                onComplete: function() {
//                    $thisItem.find(".contact-form-helper").addClass("js-visible")
//                }
//            }), TweenMax.to($pageHeader.find(".circle-btn"), .2, {
//                scale: 0,
//                ease: Expo.easeOut
//            }), TweenMax.to($pageHeader.find(".btn-wrapper-contact .small-caps"), .2, {
//                y: 10,
//                opacity: 0,
//                ease: Expo.easeOut
//            })
//        }), $formStepButton.on("click", function(event) {
//            event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation();
//            var $this = $(this),
//                this_step = Number($this.closest(".form-item-container").attr("data-step")),
//                $thisItem = $this.parent();
//            return TweenMax.to($thisItem.find(".contact-form-helper"), 1, {
//                scale: 0,
//                ease: Expo.easeOut
//            }), $_html.hasClass("mobile") || initContactForm("start", this_step + 1), !1
//        }), $sendContactForm.on("click", function(event) {
//            event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation(), submitForm($form)
//        }), $formHelper.on("click", function() {
//            if ($_body.hasClass("js-contact-form-active")) {
//                var $activeItem = $(".form-item-container.active"),
//                    $item = $activeItem.find(".required"),
//                    defeito = this.defaultValue;
//                return check($item, defeito, 0), $item.hasClass("erro") ? $item.parent(".input").addClass("erro") : $item.parent(".input").removeClass("erro"), $item.hasClass("erro") || $activeItem.find("button").click(), !1
//            }
//        }), $(".js-submit-form").on("click", function() {
//            if (validateForm($form)) {
//                var $this = $(this),
//                    $submitProgressSVG = Snap("#submit-progress"),
//                    submitprogress = $submitProgressSVG.circle(32, 32, 30),
//                    $okSvg = $this.find(".icon"),
//                    rgb_color = $this.css("backgroundColor").match(/\d+/g);
//                $okSvg.css({
//                    strokeDasharray: 100,
//                    strokeDashoffset: 100
//                }), submitprogress.attr({
//                    fill: "none",
//                    stroke: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",1)",
//                    strokeWidth: 2,
//                    strokeLinecap: "round",
//                    strokeDasharray: 188.4,
//                    strokeDashoffset: 188.4,
//                    transform: "rotate(-45deg)",
//                    class: "submit-timer"
//                }), TweenMax.to($this.find("span"), .5, {
//                    autoAlpha: 0,
//                    y: "0px",
//                    ease: Expo.easeOut,
//                    onComplete: function() {
//                        TweenMax.set($this, {
//                            height: $this.outerHeight(),
//                            ease: Expo.easeOut
//                        }), TweenMax.to($this, .3, {
//                            width: $this.outerHeight() + 10,
//                            height: $this.outerHeight() + 10,
//                            minWidth: $this.outerHeight() + 10,
//                            borderRadius: $this.outerHeight(),
//                            borderColor: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",.3)",
//                            borderWidth: "2px",
//                            padding: "0px",
//                            opacity: 1,
//                            ease: Expo.easeout,
//                            onComplete: function() {
//                                TweenMax.to($("#submit-progress").find("circle"), 2, {
//                                    strokeDashoffset: 40,
//                                    ease: Expo.easeOut
//                                })
//                            }
//                        })
//                    }
//                })
//            }
//        }), "" == hasHash && $pageHeader.on("click", function(event) {
//            $(event.target).closest(".user-action").length || $(".form-item-container.active").find(".user-action").focus()
//        })
//} //////end function contactosPage
/** *******************************************************************************************
     =INSCRIÇÃO
*********************************************************************************************/
function inscricaoPage(do_inscricao) { /*page functions*/
    function initHeaderAnim(type) {
        //if($(".page-toload").hasClass("marcar-consulta-page") && !$_body.hasClass("js-no-ajax")) return false;
        "init" == type && $formSecondaryInfo.attr("data-offset", $formSecondaryInfo.offset().top), "start" == type && TweenMax.to($inscricaoFormContainer, 1, {
            y: "0px",
            autoAlpha: 1,
            ease: Expo.easeOut,
            clearProps: "y"
        })
    }

    function initFormAnimationAlt(type, delay) {
        if (_global_animatingElements) return !1;
        if ($_body.hasClass("js-form-active")) return !1;
        if ("init" == type && (TweenMax.set($formItemContainer, {
                opacity: 0,
                y: "100px"
            }), TweenMax.set($formItemContainer.find(".circle-btn"), {
                scale: 0
            }), TweenMax.set($formItemContainer.find(".form-item-title"), {
                opacity: 0
            }), TweenMax.set($formItemContainer.find(".js-anim-item"), {
                opacity: .5,
                y: "40px"
            })), "start" == type) {
            $_loadThisPage.hasClass("marcar-consulta-page") && !$_body.hasClass("js-no-ajax") && (TweenMax.set($(".text-wrapper-row").find("h2"), {
                y: "20px"
            }), TweenMax.to($(".text-wrapper-row").find("h2"), .8, {
                opacity: 1,
                y: 0
            }));
            $(".secondary-info-container").offset().top - $("#header-main").outerHeight();
            // TweenMax.staggerTo($pageHeader.find("h2"), 1, {
            //   y:  - $pageHeader.find(".text-wrapper").height()/2,
            //   ease: Expo.easeOut,
            //   delay: .1
            // }, .1 );
            TweenMax.to($formSecondaryInfo, 1, {
                autoAlpha: 1
            }), TweenMax.to($number, .3, {
                y: "-20px",
                delay: .5
            });
            for (var i = 2; i < $formItemContainer.length; i++) value = "100px", value_col = "20px", TweenMax.to($formItemContainer.eq(i), 2.5, {
                opacity: .5,
                y: value,
                ease: Expo.easeOut
            }), TweenMax.to($formItemContainer.eq(i).find(".circle-btn"), 1, {
                scale: 0,
                ease: Expo.easeOut
            }), TweenMax.set($formItemContainer.eq(i).find(".js-anim-item"), {
                opacity: .5,
                y: value_col,
                ease: Expo.easeOut
            }), $formItemContainer.eq(i).removeClass("js-active active"), $formItemContainer.eq(i).find(".form-item").css({
                "pointer-events": "none"
            });
            TweenMax.to($formItemContainer.eq(1), 2.5, {
                opacity: .5,
                y: "50px",
                ease: Expo.easeOut
            }), TweenMax.to($formItemContainer.eq(1).find(".circle-btn"), 1, {
                scale: 0,
                ease: Expo.easeOut
            }), TweenMax.to($formItemContainer.eq(1).find(".js-anim-item"), 1.5, {
                opacity: .5,
                y: "20px",
                ease: Expo.easeOut
            }), $formItemContainer.eq(1).removeClass("js-active active"), $formItemContainer.eq(1).find(".form-item").css({
                "pointer-events": "none"
            }), TweenMax.set($formItemContainer.eq(0).find(".js-anim-item"), {
                opacity: 1,
                y: "0px",
                ease: Expo.easeOut
            }), TweenMax.to($formItemContainer.eq(0), 2, {
                opacity: 1,
                y: 0,
                ease: Expo.easeOut,
                delay: 0,
                onComplete: function() {
                    _global_animatingElements = !1, $formItemContainer.eq(0).find("input").first().focus(), initFormFunctions()
                }
            }), TweenMax.to($formItemContainer.eq(0).find(".circle-btn"), 1, {
                scale: 1,
                ease: Expo.easeOut
            })
        }
    }

    function initFormFunctions() {
        $_body.addClass("js-form-active"), $formContainer.attr("data-activeStep", $activeFormItem.attr("data-step"))
    }

    function initFormKeys() {
        $(document).on("keyup.inscricaoForm", function(event) {
            if ($_body.hasClass("js-form-active")) {
                if (!$(".form-item-container.active").hasClass("js-tab-next")) {
                    if ($formInput.is(":focus")) return;
                    var $focused = $("input:focus");
                    if ($focused.length > 0 || $focused.hasClass("for-tab-nav")) return
                }
                switch (event.which) {
                    case 9: //tab
                        var $this = $(this),
                            defeito = this.defaultValue;
                        $this.hasClass("required") && check($this, defeito, 0), $this.hasClass("erro") ? $this.parent(".input").addClass("erro") : $this.parent(".input").removeClass("erro");
                        var $activeItem = $(".form-item-container.active"),
                            $inputs = $activeItem.find("input");
                        if (event.shiftKey) {
                            //If needed to control shift key
                            if ($inputs.eq(0).hasClass("js-active-input")) return $inputs.eq(0).removeClass("js-active-input"), scrollFormStep("up", !0), !1
                        } else if ($inputs.eq($inputs.length - 1).hasClass("js-active-input") || $activeItem.hasClass("js-tab-next")) return $inputs.eq($inputs.length - 1).removeClass("js-active-input"), scrollFormStep("down", !0), !1;
                        break;
                    case 13: //enter
                        var $this = $(this),
                            defeito = this.defaultValue;
                        $this.hasClass("required") && check($this, defeito, 0), $this.hasClass("erro") ? $this.parent(".input").addClass("erro") : $this.parent(".input").removeClass("erro"),
                            // if($this.hasClass("erro")) {
                            //   event.stopImmediatePropagation();
                            //   event.preventDefault();
                            //   event.stopPropagation();
                            //   return false;
                            // }
                            ($(".form-item-container.active").find(".form-item").hasClass("gender-item") || $(".form-item-container.active").find(".form-item").hasClass("id-item")) && scrollFormStep("down", !0);
                        break;
                    case 65: //a
                        if ((11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step")) && $formInput.is(":focus")) return;
                        var $item = $(".form-item-container.active"),
                            $customInput = $item.find(".a-shortcut");
                        if (!($customInput.length > 0)) return;
                        return $customInput.click(), $.doTimeout(500, function() {
                            11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step") || scrollFormStep("down", !0)
                        }), !1;
                    case 66: //b
                        if ((11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step")) && $formInput.is(":focus")) return;
                        var $item = $(".form-item-container.active"),
                            $customInput = $item.find(".b-shortcut");
                        if (!($customInput.length > 0)) return;
                        return $customInput.click(), $.doTimeout(500, function() {
                            11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step") || scrollFormStep("down", !0)
                        }), !1;
                    case 67: //c
                        if ((11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step")) && $formInput.is(":focus")) return;
                        var $item = $(".form-item-container.active"),
                            $customInput = $item.find(".c-shortcut");
                        if (!($customInput.length > 0)) return;
                        return $customInput.click(), $.doTimeout(500, function() {
                            11 == $activeItem.attr("data-step") || 12 == $activeItem.attr("data-step") || scrollFormStep("down", !0)
                        }), !1;
                    case 68: //d
                        if ((11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step")) && $formInput.is(":focus")) return;
                        var $item = $(".form-item-container.active"),
                            $customInput = $item.find(".d-shortcut");
                        if (11 == $item.attr("data-step")) $("#formacao-outro").focus(), $("#formacao-outro").parent(".custom-input").addClass("active");
                        else {
                            if (!($customInput.length > 0)) return;
                            $customInput.click(), $.doTimeout(500, function() {
                                11 == $activeItem.attr("data-step") || 12 == $activeItem.attr("data-step") || scrollFormStep("down", !0)
                            })
                        }
                        return !1;
                    case 69: //e
                        if ((11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step")) && $formInput.is(":focus")) return;
                        var $item = $(".form-item-container.active"),
                            $customInput = $item.find(".e-shortcut");
                        if (!($customInput.length > 0)) return;
                        return $customInput.click(), $.doTimeout(500, function() {
                            11 == $activeItem.attr("data-step") || 12 == $activeItem.attr("data-step") || scrollFormStep("down", !0)
                        }), !1;
                    case 70: //f
                        if ((11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step")) && $formInput.is(":focus")) return;
                        var $item = $(".form-item-container.active"),
                            $customInput = $item.find(".f-shortcut");
                        if (!($customInput.length > 0)) return;
                        return $customInput.click(), $.doTimeout(500, function() {
                            11 == $activeItem.attr("data-step") || 12 == $activeItem.attr("data-step") || scrollFormStep("down", !0)
                        }), !1;
                    case 71: //g
                        if ((11 == $(".form-item-container.active").attr("data-step") || 12 == $(".form-item-container.active").attr("data-step")) && $formInput.is(":focus")) return;
                        var $item = $(".form-item-container.active"),
                            $customInput = $item.find(".g-shortcut");
                        if (12 == $item.attr("data-step")) $("#outros-conhecimento").focus(), $("#outros-conhecimento").parent(".custom-input").addClass("active");
                        else {
                            if (!($customInput.length > 0)) return;
                            $customInput.click(), $.doTimeout(500, function() {
                                11 == $activeItem.attr("data-step") || 12 == $activeItem.attr("data-step") || scrollFormStep("down", !0)
                            })
                        }
                        return !1;
                    case 27: //esc
                        var $item = $(".form-item-container.active");
                        //
                        // if($customInput.length > 0){
                        //   $customInput.click();
                        //   $.doTimeout(500, function(){
                        //     scrollFormStep("down", true);
                        //   });
                        // }
                        // else
                        //   return;
                        //
                        // $customInput = $item.find(".g-shortcut");
                        return $(".checkbox-input.active").removeClass("active"), $(".checkbox-input textarea,.checkbox-input input").blur(), !1
                }
            }
        })
    } /*Animation Loop*/
    function inscricaoPage_scroll() {
        _raf_loop_id = _rAF_loop(inscricaoPage_scroll_rAF)
    }

    function inscricaoPage_scroll_rAF() {
        if (direction = window.pageYOffset > lastPosition ? "down" : "up", _global_isMobile) {
            var $pageScrollHeader = $(".page-scroll-header");
            // Avoid calculations if not needed
            lastPosition != window.pageYOffset && (lastPosition = window.pageYOffset, lastPosition >= 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active")), lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active")))
        } else {
            // Avoid calculations if not needed
            if (!_global_animatingElements) {
                // if(lastPosition > 100 && direction == "down" && !$_body.hasClass("js-scrolled-down") ) {
                //   $_body.addClass("js-scrolled-down");
                //   if(!$_body.hasClass("js-fromTrans")) {
                //     $goDownHeader.click();
                //     initFormAnimation("start", .2);
                //   }
                // }
                if (lastPosition = window.pageYOffset, $formItemContainer.each(function(index) {
                        var $this = $(this);
                        if ($this[0].getBoundingClientRect().top + $this.height() / 2 >= .25 * $_window.height() && $this[0].getBoundingClientRect().bottom - $this.height() / 2 <= .75 * $_window.height()) {
                            //if($this.offset().top + $_window.scrollTop() >= _globalViewportH*.25 && $this.offset().top - $_window.scrollTop() <= _globalViewportH*.75 ) {
                            if ($this.hasClass("js-active")) return;
                            $this.addClass("js-active active"), $this.find(".form-item").css({
                                "pointer-events": "auto"
                            }); /*Check form custom input values*/
                            var check_it = !1;
                            if ("up" == direction && index > 0 && ($that = $formItemContainer, //.eq(index - 1);
                                    check_it = !0), "down" == direction && index < $formItemContainer.length && ($that = $formItemContainer, //.eq(index + 1);
                                    check_it = !1), check_it && $that.find(".custom-input-value").length > 0) {
                                var $that = $this.find(".custom-input-value");
                                check($that, "", 0) > 0 ? ($that.parent().addClass("erro"), $that.addClass("erro")) : ($that.parent().removeClass("erro"), $that.removeClass("erro"))
                            }
                            $formContainer.attr("data-activeStep", $this.attr("data-step"));
                            var form_step = Number($formContainer.attr("data-activeStep")),
                                next_form_step_number = form_step + 1,
                                $number = $formCounter.find(".number");
                            $('<span class="another-number">' + next_form_step_number + "</span>").insertAfter($formCounter.find(".number"));
                            var $anotherNumber = $formCounter.find(".another-number");
                            $number.remove(), TweenMax.to($anotherNumber, .3, {
                                y: "-20px"
                            }), $anotherNumber.removeClass("another-number").addClass("number"); /*Change type of info*/
                            var next_active_info = $this.attr("data-secInfo");
                            $formTypeofInfo.eq(next_active_info).hasClass("active") || ("up" == direction && ($formTypeofInfo.eq(next_active_info).hasClass("active") || ($formTypeofInfo.removeClass("active"), $formTypeofInfo.eq(next_active_info).removeClass("back-anim").addClass("active"))), "down" == direction && ($formTypeofInfo.eq(next_active_info).hasClass("active") || ($formContainer.find(".type-of-information li.active").removeClass("active").addClass("back-anim"), $formTypeofInfo.eq(next_active_info).addClass("active"))));
                            for (var i = 0; i < $formItemContainer.length; i++) i != index - 1 && i != index + 1 && i != index && (i < index ? (value = "-100px", value_col = "-20px") : (value = "100px", value_col = "20px"), TweenMax.to($formItemContainer.eq(i), 2.5, {
                                opacity: .5,
                                y: value,
                                ease: Expo.easeOut
                            }), TweenMax.to($formItemContainer.eq(i).find(".circle-btn"), 1, {
                                scale: 0,
                                ease: Expo.easeOut
                            }), TweenMax.set($formItemContainer.eq(i).find(".js-anim-item"), {
                                opacity: .5,
                                y: value_col,
                                ease: Expo.easeOut
                            }), $formItemContainer.eq(i).removeClass("js-active active"), $formItemContainer.eq(i).find(".form-item").css({
                                "pointer-events": "none"
                            }));
                            TweenMax.to($formItemContainer.eq(index + 1), 2.5, {
                                opacity: .5,
                                y: "50px",
                                ease: Expo.easeOut
                            }), TweenMax.to($formItemContainer.eq(index + 1).find(".circle-btn"), 1, {
                                scale: 0,
                                ease: Expo.easeOut
                            }), TweenMax.to($formItemContainer.eq(index + 1).find(".js-anim-item"), 1.5, {
                                opacity: .5,
                                y: "20px",
                                ease: Expo.easeOut
                            }), $formItemContainer.eq(index + 1).removeClass("js-active active"), $formItemContainer.eq(index + 1).find(".form-item").css({
                                "pointer-events": "none"
                            }), index - 1 >= 0 && (TweenMax.to($formItemContainer.eq(index - 1), 2.5, {
                                opacity: .5,
                                y: "-50px",
                                ease: Expo.easeOut
                            }), TweenMax.to($formItemContainer.eq(index - 1).find(".circle-btn"), 1, {
                                scale: 0,
                                ease: Expo.easeOut
                            }), TweenMax.to($formItemContainer.eq(index - 1).find(".js-anim-item"), 1.5, {
                                opacity: .5,
                                y: "-20px",
                                ease: Expo.easeOut
                            }), $formItemContainer.eq(index - 1).removeClass("js-active active"), $formItemContainer.eq(index - 1).find(".form-item").css({
                                "pointer-events": "none"
                            })), TweenMax.to($this, 2, {
                                opacity: 1,
                                y: 0,
                                ease: Expo.easeOut
                            }), TweenMax.to($this.find(".circle-btn"), 1, {
                                scale: 1,
                                ease: Expo.easeOut
                            }), TweenMax.to($this.find(".js-anim-item"), 1.5, {
                                opacity: 1,
                                y: 0,
                                ease: Expo.easeOut
                            }), $this.hasClass("js-custom-item") || $this.find("input").first().focus()
                        }
                    }), lastPosition > 300 && !$_body.hasClass("js-fixed-secondary-info")) {
                    $_body.addClass("js-fixed-secondary-info");
                    var value = $formSecondaryInfo.offset().top - $_window.scrollTop();
                    $formSecondaryInfo.css({
                        position: "fixed",
                        top: value + "px",
                        left: "0",
                        padding: "0 40px"
                    })
                }
                lastPosition <= 300 && ($_body.removeClass("js-fixed-secondary-info"), $formSecondaryInfo.css({
                    position: "absolute",
                    padding: "0 0px",
                    top: "0px"
                }))
            }
            0 == window.pageYOffset && ($_body.removeClass("js-scrolled-down"), TweenMax.to($formItemContainer.eq(0), 2, {
                opacity: 1,
                y: 0,
                ease: Expo.easeOut
            }), TweenMax.to($formItemContainer.eq(0).find(".js-anim-item"), 1.5, {
                opacity: 1,
                y: 0,
                ease: Expo.easeOut
            }))
        }
    }
    if (!do_inscricao) return $_window.off("scroll.inscricaoPage"), $(document).off("keydown.inscricaoForm"), $_window.off("blur"), $_window.off("focus"), $_body.removeClass("js-form-active js-fromTrans"), window.cancelAnimationFrame(_raf_loop_id), enableScroll(), !1;
    $_body.removeClass("js-form-active"), $_window.off("scroll.inscricaoPage"), $(document).off("keyup.inscricaoForm"), $_window.on("scroll.inscricaoPage", inscricaoPage_scroll), enableScroll();
    var lastPosition = -1,
        $inscricaoFormContainer = ($(".page-header"), $(".page-content"), $(".inscricao-form-container")),
        $formSecondaryInfo = $(".secondary-info-container"),
        $formContainer = $(".form-container"),
        $formTypeofInfo = $formContainer.find(".type-of-information li"),
        $inscricaoFormConfirmation = ($formContainer.find(".type-of-information li.active"), $(".inscricao-page .inscricao-form"), $(".inscricao-form-confirmation")),
        $formItemContainer = $(".form-item-container"),
        $formItemButton = $formItemContainer.find(".circle-btn"),
        $goDownHeader = $(".page-header .go-down"),
        $form = $(".steps-form"),
        $formInput = $form.find("input:not(.for-tab-nav), textarea"),
        $customInput = $form.find(".custom-input"),
        $selectInput = $form.find(".select-input-value"),
        $activeFormItem = $(".form-item-container.active"),
        $formCounter = $formContainer.find(".counter"),
        $number = $formCounter.find(".number"),
        $submitForm = $(".submit-form"),
        direction = null; /*init functions*/
    $_body.hasClass("mobile") || (initFormAnimationAlt("init"), initHeaderAnim("init"), initHeaderAnim("start"), initFormKeys(), pressAnime(), initFormAnimationAlt("start", 0)), _global_animatingElements = !1, /*events*/
        // if(!$_body.hasClass("js-fromTrans")) {
        //   $.doTimeout(1000, function() {
        //     $goDownHeader.click();
        //   });
        // }
        // else {
        //   initFormAnimation("start", 0);
        // }
        //initFormAnimation("start", 0);
        $top = $("<span></span>"), $bottom = $("<span></span>"), $top.css({
            position: "fixed",
            width: "100%",
            height: "1px",
            "background-color": "red",
            top: .75 * _globalViewportH + "px",
            "z-index": "9999"
        }), $bottom.css({
            position: "fixed",
            width: "100%",
            height: "1px",
            "background-color": "red",
            top: .25 * _globalViewportH + "px",
            "z-index": "9999"
        }),
        //$_body.append($top);
        //$_body.append($bottom);
        $_window.on("blur", function() {
            _global_animatingElements = !0
        }), $_window.on("focus", function() {
            $.doTimeout(500, function() {
                _global_animatingElements = !1
            })
        }), $_body.addClass("js-form-active"), $_window.on("formSent", function() {
            var $expand = $(".expand-circle"),
                $formSentWrapper = $(".form-sent-wrapper"),
                $papagaio = $(".papagaio");
            TweenMax.to($expand, .5, {
                autoAlpha: 1
            }), TweenMax.to($expand, 1.5, {
                scale: 200,
                delay: .5,
                ease: Expo.easeInOut
            }), $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.set($_window, {
                scrollTo: {
                    y: 0
                },
                delay: 2,
                ease: Power4.easeOut,
                onComplete: function() {
                    disableScroll(), TweenMax.to($formSentWrapper, .4, {
                        autoAlpha: 1,
                        ease: Power2.easeout,
                        onComplete: function() {
                            TweenMax.to($papagaio, 4, {
                                y: "-1000px",
                                x: "75px",
                                delay: 1
                            })
                        }
                    })
                }
            }) : TweenMax.set($_body, {
                scrollTo: {
                    y: 0
                },
                delay: 2,
                ease: Power4.easeOut,
                onComplete: function() {
                    disableScroll(), TweenMax.to($formSentWrapper, .4, {
                        autoAlpha: 1,
                        ease: Power2.easeout,
                        onComplete: function() {
                            TweenMax.to($papagaio, 4, {
                                y: "-1000px",
                                x: "75px",
                                delay: 1
                            })
                        }
                    })
                }
            })
        }), $(".js-submit-form").on("click", function() {
            if (validateForm($form)) {
                $(this).css("pointer-events", "none");
                var $this = $(this),
                    $submitProgressSVG = Snap("#submit-progress"),
                    submitprogress = $submitProgressSVG.circle(32, 32, 30),
                    $okSvg = $this.find(".icon"),
                    rgb_color = $this.css("backgroundColor").match(/\d+/g);
                $okSvg.css({
                    strokeDasharray: 100,
                    strokeDashoffset: 100
                }), submitprogress.attr({
                    fill: "none",
                    stroke: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",1)",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeDasharray: 188.4,
                    strokeDashoffset: 188.4,
                    transform: "rotate(-45deg)",
                    class: "submit-timer"
                }), TweenMax.to($this.find("span"), .5, {
                    autoAlpha: 0,
                    y: "0px",
                    ease: Expo.easeOut,
                    onComplete: function() {
                        TweenMax.set($this, {
                            height: $this.outerHeight(),
                            ease: Expo.easeOut
                        }), TweenMax.to($this, .3, {
                            width: $this.outerHeight() + 10,
                            height: $this.outerHeight() + 10,
                            minWidth: $this.outerHeight() + 10,
                            borderRadius: $this.outerHeight(),
                            borderColor: "rgba(" + rgb_color[0] + "," + rgb_color[1] + "," + rgb_color[2] + ",.3)",
                            borderWidth: "2px",
                            padding: "0px",
                            opacity: 1,
                            ease: Expo.easeout,
                            onComplete: function() {
                                TweenMax.to($("#submit-progress").find("circle"), 2, {
                                    strokeDashoffset: 40,
                                    ease: Expo.easeOut
                                })
                            }
                        })
                    }
                })
            }
        }), $goDownHeader.on("click", function() {
            disableScroll(), $.doTimeout(1500, function() {
                updateScrollPosition(), enableScroll()
            })
        }), $("input,select").bind("keydown", function(e) {
            var keyCode = e.keyCode || e.which;
            13 === keyCode && (e.preventDefault(), $("input, select, textarea")[$("input,select,textarea").index(this) + 1].focus())
        }), $formItemContainer.children(".columns").on("mouseenter", function() {
            var $this = $(this).parent(".form-item-container");
            $this.hasClass("active") || $_body.hasClass("mobile") || TweenMax.to($this, .5, {
                opacity: .8
            })
        }).on("mouseleave", function() {
            var $this = $(this).parent(".form-item-container");
            $this.hasClass("active") || $_body.hasClass("mobile") || TweenMax.to($this, .5, {
                opacity: .5
            })
        }), $formItemContainer.children(".columns").on("click", function() {
            var $this = $(this).parent(".form-item-container");
            if (!$this.hasClass("active")) {
                var active_index = $formItemContainer.index($formItemContainer.filter(".js-active")),
                    this_index = $formItemContainer.index($this);
                active_index > this_index ? scrollFormStep("up", !1) : scrollFormStep("down", !1)
            }
        }), $formItemButton.on("click", function(event) {
            event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation();
            var $this = $(this),
                this_step = Number($this.closest(".form-item-container").attr("data-step"));
            this_step + 1 < $formItemContainer.length ? scrollFormStep("down", !1) : $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, 1.5, {
                scrollTo: {
                    y: $inscricaoFormConfirmation
                },
                ease: Power4.easeOut
            }) : TweenMax.to($_body, 1.5, {
                scrollTo: {
                    y: $inscricaoFormConfirmation
                },
                ease: Power4.easeOut
            })
        }), $submitForm.on("click", function(event) {
            event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation(), submitForm($form)
        }), $formInput.on("focus", function(event) {
            if (_global_animatingElements) return event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation(), !1;
            var $this = $(this),
                active_form_step = Number($(".form-item-container.active").attr("data-step")),
                $thisFormItemContainer = $this.closest(".form-item-container"),
                this_form_step = Number($thisFormItemContainer.attr("data-step"));
            $formInput.removeClass("js-active-input"), $this.addClass("js-active-input"), 11 == $thisFormItemContainer.attr("data-step") &&
                // $('#formacao-outro').focus();
                $("#formacao-outro").parent(".custom-input").addClass("active"), 12 == $thisFormItemContainer.attr("data-step") &&
                // $('#outros-conhecimento').focus();
                $("#outros-conhecimento").parent(".custom-input").addClass("active"), $this.parent().hasClass("erro") && $this.hasClass("erro") && $this.val().length > 0 && ($this.parent().removeClass("erro"), $this.removeClass("erro")), $thisFormItemContainer.hasClass("active") || (active_form_step < this_form_step ? (scrollFormStep("down", !0), $this.hasClass("textarea-focus") && $.doTimeout(500, function() {
                    $this.next().focus()
                })) : scrollFormStep("up", !0))
        }), $formInput.on("keyup", function() {
            var $this = $(this);
            this.defaultValue;
            if ($this.hasClass("js-tab-next"))
                if (Number($this.attr("maxlength")) != $this.val().length || $this.hasClass("js-tabbed")) $this.removeClass("js-tabbed");
                else {
                    var $activeItem = $(".form-item-container.active"),
                        $inputs = $activeItem.find("input");
                    $inputs.each(function(index) {
                        var $this = $(this);
                        if ($this.hasClass("js-active-input")) return $inputs.eq(index + 1).focus(), $inputs.eq(index).addClass("js-tabbed"), !1
                    })
                }
            if ($this.hasClass("required")) return $this.val().length > 0 ? ($this.parent().removeClass("erro"), void $this.removeClass("erro")) : void 0
        }), $formInput.on("blur", function(event) {
            if (_global_animatingElements) return event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation(), !1;
            var $this = $(this);
            if ($this.parent(".checkbox-input").hasClass("other-input") && 0 == $this.val().length && ($formInput.parent(".checkbox-input").removeClass("active"), $this.parent(".checkbox-input").addClass("js-active-input")), $this.hasClass("checkbox-input") && $this.hasClass("other-input") && 0 == $this.val().length && $this.removeClass("active"), $this.hasClass("js-last")) return TweenMax.to(window, 1.5, {
                scrollTo: {
                    y: $inscricaoFormConfirmation
                },
                ease: Power4.easeOut
            }), !1;
            var $this = $(this),
                defeito = this.defaultValue;
            $this.hasClass("required") && (check($this, defeito, 0) > 0 ? ($this.parent().addClass("erro"), $this.addClass("erro")) : ($this.parent().removeClass("erro"), $this.removeClass("erro")))
        }), $selectInput.on("change", function() {
            var str = "";
            $("select option:selected").each(function() {
                str += $(this).text() + " "
            }), $(".select-input .text-label").text(str), $.doTimeout(500, function() {
                scrollFormStep("down", !0)
            })
        }), $customInput.on("click", function() {
            var $this = $(this),
                target = $this.attr("data-target"),
                $activeItem = $(".form-item-container.active"),
                $customInputs = $activeItem.find(".custom-input"),
                $customInputsValue = $activeItem.find(".custom-input-value");
            //just 1 option
            $this.hasClass("radio-input") && ($this.hasClass("active") ? ($this.removeClass("active"), $customInputsValue.attr("checked", !1)) : ($customInputs.removeClass("active"), $this.toggleClass("active"), $customInputsValue.attr("checked", !1), $("#" + target).attr("checked", !0), $this.parents(".row").removeClass("erro"), $this.find("input").removeClass("erro"))),
                //multi options
                $this.hasClass("checkbox-input") && !$this.hasClass("other-input") && ($this.toggleClass("active"), $this.hasClass("active") ? $("#" + target).attr("checked", !0) : $("#" + target).attr("checked", !1)), 11 == $activeItem.attr("data-step") || 12 == $activeItem.attr("data-step") || ($this.hasClass("active") ? $.doTimeout(500, function() {
                    scrollFormStep("down", !0)
                }) : $this.hasClass("checkbox-input") && $this.hasClass("other-input") && $this.addClass("active"))
        }), $(".notas-wrapper .button-wrapper").on("click", function(event) {
            var $this = $(this);
            event.preventDefault(), $(".notas-wrapper").css("height", "300px"), TweenMax.to($(".anime-column"), .6, {
                autoAlpha: 1,
                scale: 1,
                ease: Power2.easeOut
            }), TweenMax.set($this, {
                autoAlpha: 0
            })
        })
} //////end function inscricaoPage
/** *******************************************************************************************
     =SOBRE
*********************************************************************************************/
function sobrePage(do_sobre) {
    function startAnimation(element) {
        var animationData = {
            assets: [],
            v: "4.2.0",
            ddd: 0,
            layers: [{
                ddd: 0,
                ind: 0,
                ty: 4,
                nm: "mask",
                td: 1,
                ks: {
                    o: {
                        k: 100
                    },
                    r: {
                        k: 0
                    },
                    p: {
                        k: [9, 9, 0]
                    },
                    a: {
                        k: [0, 0, 0]
                    },
                    s: {
                        k: [50, 50, 100]
                    }
                },
                shapes: [{
                    ty: "gr",
                    it: [{
                        ind: 0,
                        ty: "sh",
                        closed: !0,
                        ks: {
                            k: [{
                                i: {
                                    x: .833,
                                    y: .833
                                },
                                o: {
                                    x: .167,
                                    y: .167
                                },
                                n: "0p833_0p833_0p167_0p167",
                                t: 0,
                                s: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [0, -24.375],
                                        [25.913, -1.203],
                                        [35, -8.5]
                                    ]
                                }],
                                e: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [17.125, -.625],
                                        [25.913, -1.203],
                                        [35, -8.5]
                                    ]
                                }]
                            }, {
                                i: {
                                    x: .833,
                                    y: .833
                                },
                                o: {
                                    x: .167,
                                    y: .167
                                },
                                n: "0p833_0p833_0p167_0p167",
                                t: 4,
                                s: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [17.125, -.625],
                                        [25.913, -1.203],
                                        [35, -8.5]
                                    ]
                                }],
                                e: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [.125, 26.625],
                                        [25.913, -1.203],
                                        [35, -8.5]
                                    ]
                                }]
                            }, {
                                i: {
                                    x: .833,
                                    y: .833
                                },
                                o: {
                                    x: .167,
                                    y: .167
                                },
                                n: "0p833_0p833_0p167_0p167",
                                t: 8,
                                s: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [.125, 26.625],
                                        [25.913, -1.203],
                                        [35, -8.5]
                                    ]
                                }],
                                e: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [-28.5, -.125],
                                        [7.538, 38.672],
                                        [35.125, 33.875]
                                    ]
                                }]
                            }, {
                                i: {
                                    x: .833,
                                    y: .833
                                },
                                o: {
                                    x: .167,
                                    y: .167
                                },
                                n: "0p833_0p833_0p167_0p167",
                                t: 12,
                                s: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [-28.5, -.125],
                                        [7.538, 38.672],
                                        [35.125, 33.875]
                                    ]
                                }],
                                e: [{
                                    i: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    o: [
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 0]
                                    ],
                                    v: [
                                        [23.25, -18.375],
                                        [0, -18.125],
                                        [0, 0],
                                        [.375, -18.25],
                                        [-50.212, 7.672],
                                        [19.75, 38]
                                    ]
                                }]
                            }, {
                                t: 16.0000006516934
                            }]
                        },
                        nm: "Path 1"
                    }, {
                        ty: "fl",
                        fillEnabled: !0,
                        c: {
                            k: [.05, 1, 0, 1]
                        },
                        o: {
                            k: 100
                        },
                        nm: "Fill 1"
                    }, {
                        ty: "tr",
                        p: {
                            k: [0, 0],
                            ix: 2
                        },
                        a: {
                            k: [0, 0],
                            ix: 1
                        },
                        s: {
                            k: [100, 100],
                            ix: 3
                        },
                        r: {
                            k: 0,
                            ix: 6
                        },
                        o: {
                            k: 100,
                            ix: 7
                        },
                        sk: {
                            k: 0,
                            ix: 4
                        },
                        sa: {
                            k: 0,
                            ix: 5
                        },
                        nm: "Transform"
                    }],
                    nm: "Shape 1"
                }],
                bounds: {
                    l: -51,
                    t: -25,
                    b: 39,
                    r: 36
                },
                ip: 0,
                op: 600.000024438501,
                st: 0
            }, {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: "circle cheio",
                tt: 1,
                ks: {
                    o: {
                        k: 100
                    },
                    r: {
                        k: 0
                    },
                    p: {
                        k: [9.01, 9.045, 0]
                    },
                    a: {
                        k: [-12.49, -7.08, 0]
                    },
                    s: {
                        k: [50, 50, 100]
                    }
                },
                shapes: [{
                    ty: "gr",
                    it: [{
                        d: 1,
                        ty: "el",
                        s: {
                            k: [26.84, 26.84]
                        },
                        p: {
                            k: [0, 0]
                        },
                        nm: "Ellipse Path 1",
                        closed: !0
                    }, {
                        d: 1,
                        ty: "el",
                        s: {
                            k: [26.84, 26.84]
                        },
                        p: {
                            k: [0, 0]
                        },
                        nm: "Ellipse Path 1",
                        closed: !0
                    }, {
                        ty: "fl",
                        fillEnabled: !0,
                        c: {
                            k: [1, 1, 1, 1]
                        },
                        o: {
                            k: 100
                        },
                        nm: "Fill 1"
                    }, {
                        ty: "tr",
                        p: {
                            k: [-12.49, -7.08],
                            ix: 2
                        },
                        a: {
                            k: [0, 0],
                            ix: 1
                        },
                        s: {
                            k: [100, 100],
                            ix: 3
                        },
                        r: {
                            k: 0,
                            ix: 6
                        },
                        o: {
                            k: 100,
                            ix: 7
                        },
                        sk: {
                            k: 0,
                            ix: 4
                        },
                        sa: {
                            k: 0,
                            ix: 5
                        },
                        nm: "Transform"
                    }],
                    nm: "Ellipse 1"
                }],
                bounds: {
                    l: -31,
                    t: -26,
                    b: 11,
                    r: 6
                },
                ip: 1.00000004073083,
                op: 128.000005213547,
                st: 1.00000004073083
            }, {
                ddd: 0,
                ind: 2,
                ty: 4,
                nm: "circle",
                ks: {
                    o: {
                        k: 100
                    },
                    r: {
                        k: 0
                    },
                    p: {
                        k: [9.01, 9.045, 0]
                    },
                    a: {
                        k: [-12.49, -7.08, 0]
                    },
                    s: {
                        k: [50, 50, 100]
                    }
                },
                shapes: [{
                    ty: "gr",
                    it: [{
                        d: 1,
                        ty: "el",
                        s: {
                            k: [26.84, 26.84]
                        },
                        p: {
                            k: [0, 0]
                        },
                        nm: "Ellipse Path 1",
                        closed: !0
                    }, {
                        d: 1,
                        ty: "el",
                        s: {
                            k: [26.84, 26.84]
                        },
                        p: {
                            k: [0, 0]
                        },
                        nm: "Ellipse Path 1",
                        closed: !0
                    }, {
                        ty: "st",
                        fillEnabled: !0,
                        c: {
                            k: [1, 1, 1, 1]
                        },
                        o: {
                            k: 100
                        },
                        w: {
                            k: 2
                        },
                        lc: 1,
                        lj: 1,
                        ml: 4,
                        nm: "Stroke 1"
                    }, {
                        ty: "tr",
                        p: {
                            k: [-12.49, -7.08],
                            ix: 2
                        },
                        a: {
                            k: [0, 0],
                            ix: 1
                        },
                        s: {
                            k: [100, 100],
                            ix: 3
                        },
                        r: {
                            k: 0,
                            ix: 6
                        },
                        o: {
                            k: 100,
                            ix: 7
                        },
                        sk: {
                            k: 0,
                            ix: 4
                        },
                        sa: {
                            k: 0,
                            ix: 5
                        },
                        nm: "Transform"
                    }],
                    nm: "Ellipse 1"
                }],
                bounds: {
                    l: -33,
                    t: -28,
                    b: 13,
                    r: 8
                },
                ip: 0,
                op: 127.000005172816,
                st: 0
            }],
            ip: 0,
            op: 17.0000006924242,
            fr: 29.9700012207031,
            w: 18,
            h: 18
        };
        loaderHighPic = bodymovin.loadAnimation({
            container: element,
            renderer: "svg",
            loop: !1,
            autoplay: !1,
            animationData: animationData
        })
    } /*functions*/
    function initHeaderAnim(type) {
        "init" == type && (TweenMax.set($pageHeader.find("h2"), {
            opacity: 0,
            y: "50px"
        }), TweenMax.set($pageHeader.find(".circle-btn"), {
            scale: 0,
            opacity: 1
        })), "start" == type && (TweenMax.to($pageHeader.find("h2"), 1, {
            opacity: 1,
            y: "0px",
            ease: Circ.easeOut
        }, .1), TweenMax.to($pageHeader.find(".circle-btn"), 1, {
            scale: 1,
            delay: .5,
            ease: Elastic.easeOut.config(1, 1),
            onComplete: function() {
                TweenMax.set($pageHeader.find(".circle-btn"), {
                    clearProps: "scale"
                })
            }
        }), $.doTimeout(700, function() {
            $pageHeader.find(".circle-btn .arrow-down path").addClass("active")
        }))
    }

    function scrollTweens() {
        0 == window.pageYOffset ? ($jsMaskDownWrapper.each(function() {
            var $this = $(this),
                $mask = $("<span class='mask-bg'></span>");
            $mask.css({
                display: "block",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                "background-color": "#ffffff"
            }), $this.find(".js-mask-down").append($mask)
        }), $jsMaskLeftWrapper.each(function() {
            var $this = $(this),
                $mask = $("<span class='mask-bg'></span>");
            $mask.css({
                display: "block",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                "background-color": "#ffbb02"
            }), $this.find(".js-mask-left").append($mask)
        }), $jsAnimUpGroup.each(function() {
            var $this = $(this);
            TweenMax.set($this.children(), {
                y: "50px",
                opacity: 0
            })
        }), $jsAnimUp.each(function() {
            var $this = $(this);
            TweenMax.set($this, {
                y: "50px",
                opacity: 0
            })
        }), $jsAnimReveal.each(function() {
            var $this = $(this);
            if ("left" == $this.attr("data-from")) var offset_x = "100px",
                offset_y = "0px";
            if ("right" == $this.attr("data-from")) var offset_x = "-100px",
                offset_y = "0px";
            if ("top" == $this.attr("data-from")) var offset_y = "100px",
                offset_x = "0px";
            if ("down" == $this.attr("data-from")) var offset_y = "-100px",
                offset_x = "0px";
            TweenMax.set($this, {
                x: offset_x,
                y: offset_y,
                opacity: 0
            })
        })) : ($jsMaskLeftWrapper.addClass("js-animated"), $jsMaskDownWrapper.addClass("js-animated"))
    } /*Animation Loop*/
    function sobrePage_scroll() {
        _raf_loop_id = _rAF_loop(sobrePage_scroll_rAF)
    }

    function sobrePage_scroll_rAF() {
        var $pageScrollHeader = $(".page-scroll-header");
        // Avoid calculations if not needed
        lastPosition != window.pageYOffset && (window.pageYOffset > lastPosition ? direction = "down" : direction = "up", lastPosition = window.pageYOffset, $thumbnail.hasClass("js-hover") && $thumbnail.trigger("mouseleave"), lastPosition > 10 && "down" == direction && !$_body.hasClass("js-scrolled-down") && ($_body.addClass("js-scrolled-down"), $pageScrollHeader.addClass("active")), lastPosition < 10 && ($_body.removeClass("js-scrolled-down"), $pageScrollHeader.removeClass("active")), verge.inY($sobreTitle, -300) && $sobreTitle.find(".picto").addClass("active"), $jsAnimUpGroup.each(function() {
            var $this = $(this);
            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.children(), 1, {
                y: 0,
                opacity: 1,
                ease: Power2.easeOut
            }, .2))
        }), $jsAnimUp.each(function() {
            var $this = $(this);
            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this, 1, {
                y: 0,
                opacity: 1,
                ease: Power2.easeOut
            }, .2))
        }), $jsAnimReveal.each(function() {
            var $this = $(this);
            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated active"), TweenMax.staggerTo($this, 1, {
                x: 0,
                y: 0,
                opacity: 1,
                ease: Expo.easeOut
            }, .2))
        }), $jsMaskDownWrapper.each(function() {
            var $this = $(this);
            $this.hasClass("js-animated") || verge.inY($this, -100) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.find(".mask-bg"), 1, {
                y: "100%",
                ease: Circ.easeInOut
            }, .2))
        }), $jsMaskLeftWrapper.each(function() {
            var $this = $(this);
            $this.hasClass("js-animated") || verge.inY($this, -700) && ($this.addClass("js-animated"), TweenMax.staggerTo($this.find(".mask-bg"), .8, {
                x: "101%",
                ease: Circ.easeInOut
            }, .1))
        }))
    }
    if (!do_sobre) return $_window.off("scroll.sobrePage"), $_body.removeClass("sobre-page"), !1;
    $_window.on("scroll.sobrePage", sobrePage_scroll), $_body.addClass("sobre-page");
    var loaderHighPic, lastPosition = -1,
        $pageHeader = $(".page-header"),
        $fullImages = $(".full-images"),
        $thumbnail = $(".thumbnail"),
        $jsMaskDownWrapper = ($(".slideshow-container"), $(".js-mask-down-wrapper")),
        $jsMaskLeftWrapper = $(".js-mask-left-wrapper"),
        $hiddenProtocols = $(".hidden-protocols"),
        $showHideProtocols = $(".show-more-protocols");
    $sobreTitle = $(".sobre-title"), $jsAnimUpGroup = $(".js-anim-up-group"), $jsAnimUp = $(".js-anim-up"), $jsAnimReveal = $(".js-anim-reveal"), /*Initializations*/
        initHeaderAnim("init"), initHeaderAnim("start"), pressAnime(), scrollTweens(), /*events*/
        $_body.hasClass("mobile") ? (window.innerWidth > 767 ? $(".slideshow-container").vTicker({
            speed: 500,
            pause: 1500,
            height: 60,
            mousePause: !1
        }) : $(".slideshow-container").vTicker({
            speed: 500,
            pause: 1500,
            height: 40,
            mousePause: !1
        }), $thumbnail.on("click", function() {
            var $this = $(this),
                $bgHover = $this.find(".bg-hover"),
                $goAnime = $this.find(".go-anime"),
                $closeToolTip = $this.find(".close-tooltip");
            if (!$this.hasClass("active")) {
                if ($.each($thumbnail, function() {
                        $(this).hasClass("active") && ($(this).toggleClass("active"), TweenMax.to($(this).find(".close-tooltip"), .1, {
                            autoAlpha: 0,
                            y: 0
                        }), TweenMax.to($(this).find(".bg-hover"), .1, {
                            delay: .35,
                            autoAlpha: 0
                        }), TweenMax.staggerTo($(this).find(".go-anime"), .4, {
                            opacity: 0,
                            y: 0
                        }, .2))
                    }), $this.addClass("js-hover"), !$this.hasClass("js-hover")) return !1;
                $this.hasClass("active") || ($this.toggleClass("active"), TweenMax.set($closeToolTip, {
                    y: 10
                }), TweenMax.to($closeToolTip, .1, {
                    delay: .25,
                    autoAlpha: 1,
                    y: 0
                }), TweenMax.to($bgHover, .1, {
                    autoAlpha: 1
                }), TweenMax.staggerTo($goAnime, .4, {
                    opacity: 1,
                    y: -10,
                    delay: .15
                }, .2))
            }
        }), $(document).on("click", ".thumbnail.active .close-tooltip", function() {
            var $this = $(this),
                $thisThumb = $this.parent(".thumbnail"),
                $bgHover = $this.parent(".thumbnail").find(".bg-hover"),
                $goAnime = $this.parent(".thumbnail").find(".go-anime");
            $thisThumb.toggleClass("active"), TweenMax.to($this, .1, {
                autoAlpha: 0,
                y: 10
            }), TweenMax.to($bgHover, .1, {
                delay: .35,
                autoAlpha: 0
            }), TweenMax.staggerTo($goAnime, .4, {
                opacity: 0,
                y: 0
            }, .2)
        })) : ($(".slideshow-container").vTicker({
            speed: 500,
            pause: 1500,
            height: 60,
            mousePause: !1
        }), $thumbnail.on("mouseenter", function(e) {
            var $this = $(this),
                $bgHover = $this.find(".bg-hover"),
                $goAnime = $this.find(".go-anime"),
                imageTarget = $this.attr("data-image-target"),
                $loader = $this.find(".loader"),
                offset = $(this).offset();
            e.pageX - offset.left, e.pageY - offset.top;
            // relativeX = relativeX-$bgHover.width()/2;
            // relativeY = relativeY-$bgHover.height()/2;
            // $bgHover.css({
            //   "left": 0,
            //   "top": 0,
            //   'width':'100%',
            //   'height':'100%'
            //   "transform": "scale(2)",
            //   "-webkit-transform": "scale(2)"
            // });
            //TweenMax.to($bgHover, .1, {autoAlpha:.9});
            return startAnimation($loader[0]), $this.find("img").hide(), $this.addClass("js-hover"), !!$this.hasClass("js-hover") && (TweenMax.to($bgHover, .1, {
                opacity: .9,
                visibility: "visible"
            }), TweenMax.staggerTo($goAnime, .4, {
                opacity: 1,
                y: 0,
                delay: .15
            }, .2), void $.doTimeout(0, function() {
                return !!$this.hasClass("js-hover") && ($loader.css("opacity", 1), loaderHighPic.play(), void loaderHighPic.addEventListener("complete", function() {
                    $(".titles-columns").css("opacity", 0), $thumbnail.css("opacity", .15), $this.css("opacity", 1), $loader.css("opacity", 0), TweenMax.to($fullImages.find(".image-wrapper[data-image='" + imageTarget + "']"), .2, {
                        autoAlpha: 1,
                        ease: Power4.easeOut,
                        onComplete: function() {
                            $fullImages.find(".image-wrapper[data-image='" + imageTarget + "']").addClass("js-scale")
                        }
                    })
                }))
            }))
        }).on("mouseleave", function(e) {
            var $this = $(this),
                $bgHover = $this.find(".bg-hover"),
                $loader = $this.find(".loader"),
                $goAnime = $this.find(".go-anime");
            $this.find(".close-tooltip");
            $this.removeClass("js-hover"), $this.find("img").show(), $(".titles-columns").css("opacity", 1), TweenMax.to($bgHover, .1, {
                    autoAlpha: 0
                }), TweenMax.killTweensOf($goAnime), TweenMax.killTweensOf($fullImages.find(".image-wrapper")), $thumbnail.css("opacity", ""), TweenMax.to($fullImages.find(".image-wrapper"), .2, {
                    autoAlpha: 0,
                    ease: Power4.easeOut
                }), $fullImages.find(".image-wrapper").removeClass("js-scale"), $loader.css("opacity", 0), loaderHighPic.destroy(),
                // $bgHover.css({
                //   "transform": "scale(0)",
                //   "-webkit-transform": "scale(0)"
                // });
                TweenMax.to($goAnime, .2, {
                    opacity: 0,
                    y: 10
                })
        })), $showHideProtocols.on("click", function() {
            var $this = $(this);
            $hiddenProtocols.toggleClass("active"), TweenMax.set($hiddenProtocols.find("p"), {
                y: "20px"
            }), $hiddenProtocols.hasClass("active") ? ($this.text("Esconder"), TweenMax.to($hiddenProtocols, 1.2, {
                autoAlpha: 1,
                height: $hiddenProtocols.find("p").height() * $hiddenProtocols.find("p").length,
                ease: Expo.easeOut
            }), TweenMax.staggerTo($hiddenProtocols.find("p"), .5, {
                y: "0px",
                autoAlpha: 1,
                ease: Power4.easeOut
            }, .05)) : ($this.text("Mostrar Mais"), TweenMax.set($hiddenProtocols.find("p"), {
                y: "20px",
                autoAlpha: 0
            }), TweenMax.to($hiddenProtocols, .3, {
                autoAlpha: 0,
                height: "0"
            }))
        })
} //////end function sobrePage
/** *******************************************************************************************
     =404
*********************************************************************************************/
function errorPage(do_404) {
    function initHeaderAnim(type) {
        "init" == type && TweenMax.set($pageHeader.find(".circle-btn"), {
            scale: 0,
            opacity: 1
        }), "start" == type && (TweenMax.to($pageHeader.find(".circle-btn"), 1, {
            scale: 1,
            delay: .5,
            ease: Elastic.easeOut.config(1, 1),
            onComplete: function() {
                TweenMax.set($pageHeader.find(".circle-btn"), {
                    clearProps: "scale"
                })
            }
        }), $.doTimeout(700, function() {
            $pageHeader.find(".circle-btn .arrow-down path").addClass("active"), TweenMax.to($pageHeader.find(".text-wrapper h2"), .5, {
                opacity: 1
            })
        }))
    }
    if (!do_404) return $_body.removeClass("four-o-four-page"), !1;
    $_body.addClass("four-o-four-page"); /*variables*/
    var $pageHeader = $(".page-header");
    initHeaderAnim("init"), initHeaderAnim("start");
    var slide_height = $pageHeader.find("li").height();
    $(".slideshow-container").vTicker({
        speed: 500,
        pause: 1500,
        height: slide_height,
        mousePause: !1
    })
}
/** *******************************************************************************************
     =GENERAL FUNCTIONS
*********************************************************************************************/
function animateMainNav(type) {
    var $headerMain = $("#header-main");
    "init" == type && $_window.scrollTop() > $headerMain.height() && TweenMax.set($headerMain, {
        position: "fixed",
        top: 0,
        y: "100px",
        opacity: 0
    }), "start" == type && TweenMax.to($headerMain, 1, {
        y: 0,
        opacity: 1,
        ease: Expo.easeOut
    }), "reset" == type && $headerMain.attr("style", "")
}

function submitForm($form) {
    if (validateForm($form) && !$form.hasClass("sending")) {
        $form.addClass("sending"), $(".submit-btn-wrapper").removeClass("error");
        var $formButton = $(".js-submit-form");
        $formButton.css({
            "background-color": "transparent"
        }), $.ajax({
            data: $form.serialize(),
            type: "post",
            dataType: "json",
            url: "http://" + _server_hostname + "/wp-admin/admin-ajax.php",
            success: function(data) {
                $form.removeClass("sending"), TweenMax.to($formButton.find("svg path"), .5, {
                    strokeDashoffset: 0,
                    delay: .5,
                    ease: Expo.easeout,
                    onComplete: function() {
                        $_window.trigger("formSent"), $_body.hasClass("contactos-page") && $.doTimeout(500, function() {
                            resetContactFormPage()
                        })
                    }
                }), TweenMax.to($("#submit-progress").find("circle"), 2, {
                    strokeDashoffset: 0,
                    ease: Expo.easeOut
                })
            },
            error: function(data) {
                //console.log(data);
                $form.removeClass("sending")
            }
        })
    } else $(".submit-btn-wrapper").addClass("error")
}

function scrollFormStep(type, tabbed) {
    if (!_global_animatingElements) {
        var $formContainer = $(".form-container"),
            $formItemContainer = $(".form-item-container"),
            form_step = ($(".secondary-info-container"), $(".form-item-container.active"), Number($formContainer.attr("data-activeStep")));
        if ($formContainer.find("input, textarea").removeClass("js-active-input"), "down" == type && form_step + 1 < $formItemContainer.length) {
            var step = form_step + 1;
            $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, .5, {
                scrollTo: {
                    y: $formItemContainer.eq(step).offset().top - (.5 * _globalViewportH - $formItemContainer.eq(step).height() / 2)
                },
                ease: Expo.easeOut,
                onComplete: function() {
                    $formItemContainer.eq(step).hasClass("js-custom-item") || $formItemContainer.eq(step).find("input").first().focus(), _global_animatingElements = !1
                }
            }) : TweenMax.to($_body, .5, {
                scrollTo: {
                    y: $formItemContainer.eq(step).offset().top - (.5 * _globalViewportH - $formItemContainer.eq(step).height() / 2)
                },
                ease: Expo.easeOut,
                onComplete: function() {
                    $formItemContainer.eq(step).hasClass("js-custom-item") || $formItemContainer.eq(step).find("input").first().focus(), _global_animatingElements = !1
                }
            })
        }
        if ("up" == type && form_step > 0) {
            var step = form_step - 1;
            $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, .5, {
                scrollTo: {
                    y: $formItemContainer.eq(step).offset().top - (.5 * _globalViewportH - $formItemContainer.eq(step).height() / 2)
                },
                ease: Expo.easeOut,
                onComplete: function() {
                    $formItemContainer.eq(step).hasClass("js-custom-item") || $formItemContainer.eq(step).find("input").last().focus(), _global_animatingElements = !1
                }
            }) : TweenMax.to($_body, .5, {
                scrollTo: {
                    y: $formItemContainer.eq(step).offset().top - (.5 * _globalViewportH - $formItemContainer.eq(step).height() / 2)
                },
                ease: Expo.easeOut,
                onComplete: function() {
                    $formItemContainer.eq(step).hasClass("js-custom-item") || $formItemContainer.eq(step).find("input").last().focus(), _global_animatingElements = !1
                }
            })
        }
    }
}

function changeFormStep(type, tabbed) {
    if (_global_animatingElements) return !1;
    var $formContainer = $(".form-container"),
        $formItemContainer = $(".form-item-container"),
        $activeFormItem = $(".form-item-container.active"),
        $formCounter = $formContainer.find(".counter"),
        $formTypeofInfo = $formContainer.find(".type-of-information li"),
        $formTypeofInfoActive = $formContainer.find(".type-of-information li.active"),
        form_step = Number($formContainer.attr("data-activeStep"));
    if ("down" == type && form_step + 1 < $formItemContainer.length) {
        _global_animatingElements = !0;
        var $nextActiveFormItem = $formItemContainer.eq(form_step + 1),
            next_form_step_number = form_step + 2,
            $number = $formCounter.find(".number"),
            translate_val = 0; /*Change Counter*/
        $('<span class="another-number">' + next_form_step_number + "</span>").insertAfter($formCounter.find(".number")), TweenMax.to($number, .3, {
            y: "-=20px",
            onComplete: function() {
                var $anotherNumber = $formCounter.find(".another-number");
                $number.remove(), TweenMax.to($anotherNumber, .3, {
                    y: "-20px"
                }), $anotherNumber.removeClass("another-number").addClass("number")
            }
        }); /*Change type of info*/
        var next_active_info = $nextActiveFormItem.attr("data-secInfo");
        $formTypeofInfo.eq(next_active_info).hasClass("active") || ($formTypeofInfoActive.removeClass("active").addClass("back-anim"), $.doTimeout(300, function() {
            $formTypeofInfo.eq(next_active_info).addClass("active")
        })), $formItemContainer.each(function(index) {
            var $this = $(this);
            if ($this.hasClass("active")) TweenMax.to($this, .5, {
                y: "-=405px",
                opacity: 0,
                pointerEvents: "none",
                delay: .02,
                ease: Expo.easeOut,
                onComplete: function() {
                    _global_animatingElements = !1, $activeFormItem.removeClass("active"), $nextActiveFormItem.addClass("active"), $nextActiveFormItem.find(".form-item").css({
                        "pointer-events": "auto"
                    }), tabbed || $nextActiveFormItem.find("input").first().focus(), $formContainer.attr("data-activeStep", $nextActiveFormItem.attr("data-step"))
                }
            });
            else if ($this.attr("data-step") == form_step + 1 || $this.attr("data-step") == form_step + 2) {
                if ($this.attr("data-step") == form_step + 1) {
                    var opac = 1,
                        del = 0;
                    translate_val = $this.position().top - 45
                } else var opac = .2,
                    del = .2;
                TweenMax.to($this, .5, {
                    y: "-=" + translate_val + "px",
                    opacity: opac,
                    ease: Expo.easeOut,
                    delay: .02 + del
                })
            } else TweenMax.set($this, {
                y: "-=" + translate_val + "px",
                opacity: 0
            })
        })
    }
    if ("up" == type && form_step > 0) {
        _global_animatingElements = !0;
        var $nextActiveFormItem = $formItemContainer.eq(form_step - 1),
            next_form_step_number = form_step,
            $number = $formCounter.find(".number"); /*Change Counter*/
        $('<span class="another-number another-number-back">' + next_form_step_number + "</span>").insertAfter($formCounter.find(".number")), TweenMax.set($(".another-number"), {
            y: "-40px"
        }), TweenMax.to($number, .3, {
            y: "+=20px",
            onComplete: function() {
                $(".another-number").css("opacity", 1);
                var $anotherNumber = $formCounter.find(".another-number");
                $number.remove(), TweenMax.to($anotherNumber, .3, {
                    y: "-20px"
                }), $anotherNumber.removeClass("another-number-back another-number").addClass("number")
            }
        }); /*Change type of info*/
        var next_active_info = $nextActiveFormItem.attr("data-secInfo");
        $formTypeofInfo.eq(next_active_info).hasClass("active") || ($formTypeofInfo.removeClass("active"), $.doTimeout(300, function() {
            $formTypeofInfo.eq(next_active_info).removeClass("back-anim").addClass("active")
        })), $formItemContainer.each(function(index) {
            var $this = $(this),
                translate_val = $formItemContainer.eq(index - 1).height() + 45;
            if ($this.hasClass("active")) TweenMax.to($this, .5, {
                y: "+=" + translate_val + "px",
                opacity: .2,
                pointerEvents: "none",
                delay: .04,
                ease: Expo.easeOut,
                onComplete: function() {
                    _global_animatingElements = !1, $activeFormItem.removeClass("active"), $nextActiveFormItem.addClass("active"), $nextActiveFormItem.find(".form-item").css({
                        "pointer-events": "auto"
                    }), tabbed || $nextActiveFormItem.find("input").first().focus(), $formContainer.attr("data-activeStep", $nextActiveFormItem.attr("data-step"))
                }
            });
            else if ($this.attr("data-step") == form_step - 1 || $this.attr("data-step") == form_step - 2)
                if ($this.attr("data-step") == form_step - 2) var opacity = 0;
                else {
                    var opacity = 1;
                    TweenMax.to($this, .5, {
                        y: "+=405px",
                        opacity: opacity,
                        ease: Expo.easeOut
                    })
                }
            else TweenMax.set($this, {
                y: "+=405px",
                opacity: 0
            })
        })
    }
}

function initToolTips() {
    var $tooltipsLink = ($(".tooltip"), $(".tooltip .link")),
        $tooltipInner = $(".tooltip-inner");
    $(".close-tooltip");
    $_body.hasClass("mobile") ? $tooltipsLink.on("click", function() {
        var $this = $(this),
            $tooltipInner = $this.parent().find(".tooltip-inner").clone(!0);
        disableScroll(), $("#modal-content").addClass("tooltip").html($tooltipInner);
        var $closeTooltip = $("#modal-content .close-tooltip");
        $_body.addClass("js-modal-open"), $tooltipInnerNew = $("#modal-content .tooltip-inner"), TweenMax.set($("#modal-content"), {
            scale: .7,
            opacity: 0
        }), TweenMax.set($("#modal-bg"), {
            opacity: 0
        }), TweenMax.set($tooltipInnerNew, {
            autoAlpha: 1,
            scale: 1
        }), TweenMax.set($tooltipInnerNew.find(".close-tooltip"), {
            autoAlpha: 1
        }), TweenMax.set($tooltipInnerNew.parent().find(".overlay"), {
            autoAlpha: 1
        }), TweenMax.to($("#modal-content"), .3, {
            scale: 1,
            opacity: 1,
            delay: .05,
            ease: Expo.easeOut
        }), TweenMax.to($("#modal-bg"), .8, {
            opacity: .8,
            ease: Expo.easeOut
        }), $closeTooltip.on("click", function() {
            var $this = $(this),
                $tooltipInner = $this.parent(".tooltip-inner");
            enableScroll(), TweenMax.set($tooltipInner.parent().find(".overlay"), {
                autoAlpha: 0
            }), TweenMax.set($("#modal-bg"), {
                autoAlpha: 0
            }), TweenMax.set($this, {
                autoAlpha: 0
            }), TweenMax.set($tooltipInner, {
                autoAlpha: 0,
                scaleX: .2,
                scaleY: .2,
                ease: Expo.easeOut,
                onComplete: function() {
                    $("#modal-content").empty(), $_body.removeClass("js-modal-open"), $("#modal-content").attr("style", "").removeClass("tooltip"), $("#modal-bg").attr("style", "")
                }
            })
        })
    }) : $tooltipsLink.on("mouseenter", function() {
        var $this = $(this),
            $tooltipInner = $this.parent().find(".tooltip-inner"),
            offset = $tooltipInner.attr("data-tooltipOffset");
        $this.addClass("hover"), $this.parents(".tooltip").css("z-index", 1e3), $.doTimeout(60, function() {
            return !!$this.hasClass("hover") && (TweenMax.set($tooltipInner, {
                x: "100%"
            }), void TweenMax.to($tooltipInner, .5, {
                autoAlpha: 1,
                x: "-=" + offset,
                ease: Expo.easeOut
            }))
        })
    }).on("mouseleave", function() {
        var $this = $(this),
            $tooltipInner = $this.parent().find(".tooltip-inner"),
            offset = $tooltipInner.attr("data-tooltipOffset");
        $this.removeClass("hover"), $tooltipInner.removeClass("active"), $.doTimeout(100, function() {
            return !$tooltipInner.hasClass("active") && ($this.parents(".tooltip").css("z-index", ""), void TweenMax.to($tooltipInner, .5, {
                autoAlpha: 0,
                x: "+=" + offset,
                ease: Expo.easeOut,
                onComplete: function() {
                    TweenMax.set($tooltipInner, {
                        x: "0px"
                    })
                }
            }))
        })
    }), $tooltipInner.on("mouseenter", function() {
        var $this = $(this);
        $this.addClass("active"), $this.parent().find(".link").addClass("active")
    }).on("mouseleave", function() {
        var $this = $(this),
            offset = $this.attr("data-tooltipOffset");
        $this.removeClass("active"), $this.parent().find(".link").removeClass("active"), $this.parents(".tooltip").css("z-index", ""), TweenMax.to($this, .5, {
            autoAlpha: 0,
            x: "+=" + offset,
            ease: Expo.easeOut,
            onComplete: function() {
                TweenMax.set($this, {
                    x: "0px"
                })
            }
        })
    })
}

function manageBodyClasses() {
    $_body.hasClass("js-no-ajax") ? ($_loadThisPage.hasClass("single-formacao-page") || $_loadThisPage.hasClass("inscricao-page") && !$_loadThisPage.hasClass("marcar-consulta-page") ? $_body.addClass("blue-bg") : $_body.removeClass("blue-bg"), $_loadThisPage.hasClass("marcar-consulta-page") ? ($_body.addClass("yellow-bg"), $_body.addClass("marcar-consulta"), $_body.addClass("inscricao")) : ($_body.removeClass("yellow-bg"), $_body.removeClass("marcar-consulta inscricao")), $_loadThisPage.hasClass("inscricao-page") ? $_body.addClass("inscricao") : $_body.removeClass("inscricao"), $_loadThisPage.hasClass("archive-formacao-page") ? $_body.addClass("archive-formacao") : $_body.removeClass("archive-formacao"), $_loadThisPage.hasClass("single-formacao-page") ? $_body.addClass("single-formacao") : $_body.removeClass("single-formacao")) : ($(".page-main.page-next").find(".page-toload").hasClass("single-formacao-page") || $(".page-main.page-next").find(".page-toload").hasClass("inscricao-page") && !$(".page-main.page-next").find(".page-toload").hasClass("marcar-consulta-page") ? $_body.addClass("blue-bg") : $_body.removeClass("blue-bg"), $(".page-main.page-next").find(".page-toload").hasClass("marcar-consulta-page") ? ($_body.addClass("yellow-bg"), $_body.addClass("marcar-consulta"), $_body.addClass("inscricao")) : ($_body.removeClass("yellow-bg"), $_body.removeClass("marcar-consulta"), $_body.removeClass("inscricao")), $(".page-main.page-next").find(".page-toload").hasClass("inscricao-page") ? $_body.addClass("inscricao") : $_body.removeClass("inscricao"))
}

function pressAnime() {
    var $pressAnimeBtn = $(".pressAnime");
    return !$_body.hasClass("mobile") && void($pressAnimeBtn.hasClass("shadow") ? ($pressAnimeBtn.on("mousedown", function() {
        var $this = $(this);
        TweenMax.to([$this.find(".text"), $this.find(".color")], .1, {
            y: 4
        })
    }).on("mouseup", function() {
        var $this = $(this);
        TweenMax.to([$this.find(".text"), $this.find(".color")], .1, {
            y: 0
        })
    }), $pressAnimeBtn.on("mouseenter", function() {
        var $this = $(this);
        TweenMax.to([$this.find(".text"), $this.find(".color")], .1, {
            y: 2
        })
    }).on("mouseleave", function() {
        var $this = $(this);
        TweenMax.to([$this.find(".text"), $this.find(".color")], .1, {
            y: 0
        })
    })) : $pressAnimeBtn.on("mousedown", function() {
        var $this = $(this);
        $this.hasClass("no-pointer") || $this.parent().hasClass("no-pointer") || $this.children().hasClass("no-pointer") || TweenMax.to($this, .2, {
            scale: .95,
            force3D: !1,
            perspective: 1e3,
            transformOrigin: "center bottom"
        })
    }).on("mouseup mouseout", function() {
        var $this = $(this);
        TweenMax.to($this, .2, {
            scale: 1,
            force3D: !1,
            perspective: 1e3,
            transformOrigin: "center bottom",
            onComplete: function() {}
        })
    }))
}

function avatarDisposal() {
    var $avatarWrapper = $(".avatar-wrapper"),
        $avatar = $avatarWrapper.find(".avatar");
    $avatarWrapper.each(function() {
        var $this = $(this),
            $avatar = $this.find(".avatar"),
            avatarLength = $this.find(".avatar").length;
        avatarLength > 1 && ($avatar.css({
            "margin-left": -$avatar.width() / 2
        }), $this.css({
            "margin-left": $avatar.width() / 2
        })), avatarLength > 4 && $this.addClass("trim-avatars"), avatarLength > 2 && window.innerWidth <= 414 && $this.addClass("trim-avatars")
    }), TweenMax.to($(".avatar-row"), 1, {
        autoAlpha: 1
    }), $avatar.on("mouseenter", function(e) {
        var $this = $(this),
            dataName = $this.attr("data-name"),
            $instructorName = $this.parents(".formacao-list-item").find(".instructor-name");
        $this.addClass("js-hover"), $instructorName.text(dataName), TweenMax.to($instructorName, .2, {
            y: "0px",
            opacity: 1
        })
    }).on("mouseleave", function(e) {
        var $this = $(this),
            $instructorName = ($this.attr("data-name"), $this.parents(".formacao-list-item").find(".instructor-name"));
        $this.removeClass("js-hover"), TweenMax.to($instructorName, .2, {
            y: "10px",
            opacity: 0,
            onComplete: function() {
                $instructorName.text("")
            }
        })
    })
}

function resetContactFormPage() {
    var $form = $(".contact-form"),
        $sendContactForm = $(".send-contact-form"),
        $formItem = $("#contact-form .form-item-container");
    return !$_body.hasClass("mobile") && ($(".btn-wrapper-contact .circle-btn").click(), void $.doTimeout(2e3, function() {
        $form[0].reset(), $(".textarea-input").empty(), $formItem.removeClass("active visible"), $formItem.eq(0).addClass("active"), unbreakTitleLetters($formItem.find("h2")), console.log($_window.scrollTop()),
            //Scrolltop depois do salto - o scrollTop inicial menos o padding da secção
            $_window.scrollTop($_window.scrollTop() - 363), $form.removeAttr("style"), $formItem.removeAttr("style"), $sendContactForm.removeAttr("style"), $sendContactForm.find("span").removeAttr("style")
    }))
}
/*******************************************************************************************
 **                                                                                       **
    =MAIN =NAVIGATION and FORM NEWSLETTER
 **                                                                                       **
*********************************************************************************************/
function mainNavigation() {
    $(".hamb-menu").off("click");
    // $("#nav-main-mobile button").off("click");
    // $("#nav-main li").off("mouseover");
    // $("#nav-main li").off("mouseleave");
    // $_window.off('scroll.mainScroll');
    var tl = new TimelineMax({
            paused: !0
        }),
        speed = .2,
        $hambMenu = $(".hamb-menu"),
        $hambMenuTop = $(".hamb-menu").find(".top"),
        $hambMenuMiddle = $(".hamb-menu").find(".middle"),
        $hambMenuBottom = $(".hamb-menu").find(".bottom");
    tl.to($hambMenuTop, speed, {
        y: 6
    }).to($hambMenuBottom, speed, {
        y: -8
    }, "-=.2").to($hambMenu, speed, {
        rotation: 180,
        transformOrigin: "center center"
    }, .3).to($hambMenuMiddle, speed, {
        opacity: 0
    }, .3).to($hambMenuTop, speed, {
        rotation: 45,
        transformOrigin: "center center"
    }, .4).to($hambMenuBottom, speed, {
        rotation: -45,
        transformOrigin: "center center"
    }, .4), $(".hamb-menu").on("click", function() {
        var $navMobile = $("#nav-main-mobile");
        window.pageYOffset;
        $("#header-main").toggleClass("opened"), window.viewportUnitsBuggyfill.refresh(), TweenMax.set($navMobile.find(".pressAnime"), {
            opacity: 0,
            y: 40
        }), $_body.toggleClass("js-nav-mobile"), $_body.hasClass("js-nav-mobile") ? (tl.play(), TweenMax.to($navMobile, .1, {
            autoAlpha: 1
        }), TweenMax.staggerTo($navMobile.find(".pressAnime"), .8, {
            opacity: 1,
            y: 0,
            ease: Power2.easeOut
        }, .1), disableScroll()) : (enableScroll(), tl.reverse(), TweenMax.to($navMobile, .1, {
            autoAlpha: 0
        }), TweenMax.to($navMobile.find(".pressAnime"), 1, {
            opacity: 0,
            y: 40
        }))
    })
} //END LOAD DOCUMENT
/*******************************************************************************************
 **                                                                                       **
    =MODAL =LIGHTBOX
 **                                                                                       **
*********************************************************************************************/
function startModal() {
    //FUNCTION OPEN MODAL
    function openModal(forContent, originalURL, originalTitle) {
        //Evitar que sejam feitas mais chamadas ajax enquanto esta se está a processar
        _global_allowNavigate = !1, $_body.addClass("js-loading-page"), $modalWrapper.addClass("js-on"), TweenMax.set($modalContent, {
            scale: .7,
            opacity: 0
        }), TweenMax.set($modalBg, {
            opacity: 0
        }), $modalContent.load(forContent + " .toload", function() {
            var $this = $(this); //I am using ajax
            if ($_body.removeClass("js-no-ajax "), !$this.html()) //go to 404
                return window.location = forContent, !1;
            $("html,body").addClass("js-modal-open"), $_body.removeClass("js-loading-page");
            //ga('send', 'pageview', window.location.pathname); //analytics
            var fPreload = $("#modal-content .toload img:eq(0)").imagesLoaded();
            fPreload.always(function(instance) {
                    TweenMax.to($modalContent, .3, {
                        scale: 1,
                        opacity: 1,
                        delay: .05,
                        ease: Expo.easeOut
                    }), TweenMax.to($modalBg, .8, {
                        opacity: .8,
                        ease: Expo.easeOut
                    })
                }),
                //Close Outside Lightbox can't delegate event to document
                $("#lightbox").on("clickoutside", function(event) {
                    event.preventDefault(), event.stopPropagation(), event.stopImmediatePropagation(), $("#lightbox .btn-close-modal").click()
                }), //end click
                //Podemos continuar a navegar
                _global_allowNavigate = !0
        })
    } //end Open Modal
    //FUNCTION CLOSE MODAL
    function closeModal(originalURL, originalTitle) {
        return history.replaceState({}, originalTitle, originalURL), $modalWrapper.removeClass("js-on"), $("#modal-wrapper").scrollTop(0), $("head title").html(originalTitle), $("html,body").removeClass("js-modal-open"), $("#lightbox").remove(), !1
    }
    var $modalBg = $("#modal-bg"),
        $modalWrapper = $("#modal-wrapper"),
        $modalContent = $("#modal-content"),
        originalURL = ($(".btn-open-modal"), ""),
        originalTitle = "";
    //CLICK -event open modal (todas as modais tem de ter esta classe para abrir)
    $(document).on("click", ".btn-open-modal", function(event) {}), //end click
        //CLICK -event close modal
        $(document).on("click", "#lightbox .btn-close-modal", function(event) {
            $_body.hasClass("js-no-ajax") || (event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation(), closeModal(originalURL, originalTitle))
        }),
        //RIGHTCLICK Open brand guides
        $(document).on("contextmenu", ".btn-brand-guides", function(event) {
            event.preventDefault(), event.stopPropagation();
            var $this = $(this),
                mainTitle = " | " + $("body").attr("data-mainTitle");
            originalURL = window.location.pathname, originalTitle = $("head title").text();
            var forContent = $this.attr("data-url-brandAjax");
            $this.attr("data-url-brand"), $this.attr("data-title-brand") + mainTitle;
            //for history
            // history.replaceState({}, forTitle, forUrl);
            // $('head title').html(forTitle);
            return _global_allowNavigate && openModal(forContent, originalURL, originalTitle), !1
        })
} //////end function startModal
/*******************************************************************************************
 **                                                                                       **
    =GENERAL FUNCTIONS AND PLUGINGS CONTROL
 **                                                                                       **
*********************************************************************************************/
/** =Global page values */
function calculateGlobalValues() {
    _globalViewportW = verge.viewportW(), _globalViewportH = verge.viewportH(), _globalHalfViewportH = (_globalViewportH / 2).toFixed(0)
} /** =Random integer between min (included) and max (excluded) */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
/*-----------------------------------------------------------------------
 =SCROLLING EVENTS
-----------------------------------------------------------------------*/
// function whenScrolling(kill) {
//     if( !kill) {
//         $_window.off('scroll', $.debounce(10, rAF_NavMain) );
//         return;
//     }else{
//         $_window.on('scroll', $.debounce(10, rAF_NavMain) );
//         $_triggerColorId = $(".page-main.page-current .id-change");
//     };//end if
// }//end when scrolling
//** =Header Main Show hide elements
// function rAF_NavMain() {
//     if ( $_body.hasClass("modal-open") ) return;
//     window.requestAnimationFrame(f_rAF_NavMain);
// }
// function f_rAF_NavMain() {
//     var scrollVal = verge.scrollY();
//     //Hide header elements - event
//     ( scrollVal > 100  ) ? $_body.addClass("nav-hide") : $_body.removeClass("nav-hide");
// }
// function lockScroll(){
//
//   var initWidth = $_body.outerWidth();
//   var initHeight = $_body.outerHeight();
//
//   var scrollPosition = [
//       self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
//       self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
//   ];
//   $_html.data('scroll-position', scrollPosition);
//   $_html.data('previous-overflow', $_html.css('overflow'));
//   $_html.css('overflow', 'hidden');
//   window.scrollTo(scrollPosition[0], scrollPosition[1]);
//
//   var marginR = $_body.outerWidth()-initWidth;
//   var marginB = $_body.outerHeight()-initHeight;
//   $_body.css({'margin-right': marginR,'margin-bottom': marginB});
// }
function updateScrollPosition() {
    var scrollPosition = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    $_html.data("scroll-position", scrollPosition)
}
// function unlockScroll(){
//
//   var scrollPosition = $_html.data('scroll-position');
//   window.scrollTo(scrollPosition[0], scrollPosition[1]);
//
//   $_body.attr("style","");
//   $_html.attr("style","");
// }
function breakTitleLetters($title) {
    var title_string = $title.text();
    $title.text("");
    for (var i = 0; i < title_string.length; i++) {
        " " == title_string[i] && (title_string[i] = "&nbsp;");
        var letter = "<span>" + title_string[i] + "</span>";
        $title.append(letter)
    }
}

function unbreakTitleLetters($title) {
    $title.each(function() {
        var $this = $(this);
        $this.html($this.text())
    })
}
$(document).ready(function() {
        //** outdatedbrowser.com
        // Must be the first to be call or in older browsers IE6,7 will have weird js erros on my code, and the plugin will not work
        outdatedBrowser({
                bgColor: "#f25648",
                color: "#fff",
                lowerThan: "transform",
                languagePath: ""
            }),
            //** MODERNIZR not supporter properties
            Modernizr.addTest("backgroundcliptext", function() {
                var div = document.createElement("div");
                return div.style.cssText = Modernizr._prefixes.join("background-clip:text;"), !!div.style.cssText.replace(/\s/g, "").length
            }), Modernizr.addTest("object-fit", !!Modernizr.prefixed("objectFit"))
    }), // end function
    /*******************************************************************************************
     ****                                                                                   ****
        =DOCUMENT =READY =START Document ready
     ****                                                                                   ****
    *********************************************************************************************/
    $(document).ready(function() {
        //** =Global objects
        $_window = $(window), $_body = $("body"), $_html = $("html"), $_mainPage = $(".page-main"), $_nav_main = $("#nav-main"), $_loadThisPage = $(".page-main.page-current .page-toload"), $_currentPage = $(".page-main.page-current"), $_toPreload = $(".preload"), $_loadingPage = $("#loading-page"), _global_animatingElements = !1,
            //** =Global variables
            calculateGlobalValues(), _global_allowNavigate = !1, //When loading do not allow clicks by user ( onStartPage revers to true)
            _server_hostname = window.location.hostname, $("body").hasClass("mobile") ? _global_isMobile = !0 : _global_isMobile = !1,
            // Request Animation Frame
            _rAF_loop = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
            // IE Fallback, you can even fallback to onscroll
            function(callback) {
                window.setTimeout(callback, 1e3 / 60)
            }, _raf_loop_id = null, _scroll_direction = "down",
            //** =START PAGES
            onStartPageWhenRefresh(!0), mainNavigation(), pressAnime(), startModal(), window.viewportUnitsBuggyfill.init(),
            //Start Plugins
            FastClick.attach(document.body); //no 300ms tap delay!
        /** -----------------------------------------------------------------------------------------
          =LOAD SECTIONS - triger events =CLICK to LOAD PAGE
          body class="js-no-ajax ismobile" > inserida via php == no nosso caso a mobile
          --------------------------------------------------------------------------------------------*/
        var domainSite = window.location.host,
            mainTitle = " | " + $("body").attr("data-mainTitle"),
            homeTitle = $("h1 a").attr("data-title-home");
        _forPopstate = !0, $_linkInternal = $('a[href*="' + domainSite + '"]'), $(document).on("click", "a", function() {
                var $this = $(this);
                //Check if is ajax call
                if (void 0 === $this.attr("data-remote") || $this.attr("data-remote") === !1 || "false" === $this.attr("data-remote")) return !0;
                // exit and have normal click if not forced to remote
                if ("true" !== $this.attr("data-forceRemote")) {
                    if ($_body.hasClass("mobile")) return !0;
                    if ($this.hasClass("modal") || $this.hasClass("js-no-transPage")) return
                }
                // **ALLOW user load other pages only after page is loaded ( onStartPage )
                if (!_global_allowNavigate) return !1;
                _global_allowNavigate = !1;
                //
                var thisHref = $this.attr("href"),
                    thisHrefAjax = $this.attr("data-ajaxUrl"),
                    thisTitle = $this.attr("data-title"),
                    pageTransition = $this.attr("data-pageTrans"), // if not default is with fade or flip
                    forHistory = thisHref,
                    newContent = thisHrefAjax,
                    forTitle = thisTitle + mainTitle;
                //home page
                //Menu Items activation
                //for history
                // for title
                //analytics
                //Transition
                return thisTitle || (forTitle = homeTitle), $this.closest("#nav-main").length > 0 && ($_nav_main.find("a").removeClass("active"), $this.addClass("active")), "loadMoreFormacao" != pageTransition && (_forPopstate && history.pushState({}, forTitle, forHistory), _forPopstate = !0, $("head title").html(forTitle)), ga("send", "pageview", window.location.pathname), pageTransition || (pageTransition = "default"), $this.hasClass("js-inscricao-scroll") ? $_html.hasClass("firefox") || $_html.hasClass("ie") ? TweenMax.to($_window, .5, {
                    scrollTo: {
                        y: 0
                    },
                    ease: Expo.easeOut,
                    onComplete: function() {
                        loadPages(newContent, pageTransition)
                    }
                }) : TweenMax.to($_body, .5, {
                    scrollTo: {
                        y: 0
                    },
                    ease: Expo.easeOut,
                    onComplete: function() {
                        loadPages(newContent, pageTransition)
                    }
                }) : loadPages(newContent, pageTransition), !1
            }), //end click
            /// HISTORY
            //  note: Chrome and Safari will fire a popstate event when the page loads but Firefox doesnt. When your page loads, it might have a non-null state object and the page will receive an onload event, but no popstate event. (window.history.state; on refresh page)
            window.addEventListener && window.addEventListener("popstate", function(e) { // firefox vs webkit and safari trigers on
                return !$_html.hasClass("mobile") && (e.state ? (_forPopstate = !1, window.location = window.location, !1) : (_forPopstate = !0, !1))
            }), //endif: does not excute for <= IE8
            /* -------------------------------------------------------------------------------------------
                =EVENTS DEFAULT BURO
                -------------------------------------------------------------------------------------------- */
            //OPEN NEW WINDOW
            $(document).on("click", "a[rel=external]", function(event) {
                event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation();
                var linkExterno = window.open($(this).attr("href"));
                return linkExterno.closed
            }),
            //PRINT
            $("a[rel=print]").click(function() {
                window.print();
                return !1
            }),
            //E-MAIL: has classclass="email", e [-at-]
            $("a.email").each(function() {
                var mailReal = $(this).text().replace("[-at-]", "@");
                $(this).text(mailReal), $(this).attr("href", "mailto:" + mailReal)
            }),
            //CLEAR FORMS
            $("input[type=text], input[type=email], input.text, input.email, textarea").each(function() {
                if ($(this).hasClass("txtClear")) {
                    var defeito = this.defaultValue;
                    $(this).focus(function() {
                        $(this).val() == defeito && $(this).val("")
                    }), $(this).blur(function() {
                        "" == $(this).val() && $(this).val(defeito)
                    })
                }
            }),
            //OPEN POPUP
            $(document).on("click", ".newWindow", function(event) {
                event.stopImmediatePropagation(), event.preventDefault(), event.stopPropagation();
                var newwindow = window.open($(this).attr("href"), "", "height=480,width=560");
                return window.focus && newwindow.focus(), !1
            }),
            /*-------------------------------------------------------------------------------------------
                =KEYS
                --------------------------------------------------------------------------------------------*/
            $(document).on("keydown", function(event) {
                switch (event.which) {
                    case 40: //down
                        if ($_body.hasClass("js-form-active") && !$("input").is(":focus")) return scrollFormStep("down", !1), !1;
                        break;
                    case 38: //up
                        if ($_body.hasClass("js-form-active") && !$("input").is(":focus")) return scrollFormStep("up", !1), !1;
                        break;
                    case 39: //next
                        if ($_body.hasClass("js-form-active") && !$("input").is(":focus")) return scrollFormStep("down", !1), !1;
                        break;
                    case 37: //prev
                        if ($_body.hasClass("js-form-active") && !$("input").is(":focus")) return scrollFormStep("up", !1), !1;
                        break;
                    case 9: //tab
                        // if($_body.hasClass("js-form-active")) {
                        //   var $activeItem = $(".form-item-container.active"),
                        //       $inputs = $activeItem.find("input");
                        //   if(event.shiftKey) {
                        //     //If needed to control shift key
                        //     // if($inputs.eq(0).hasClass("erro") && $inputs.eq(0).hasClass("js-active-input")  && ( $inputs.eq(0).hasClass("js-active-input") && $inputs.eq(0).hasClass("required") && $inputs.eq(0).val().length === 0) ) {
                        //     //   $inputs.eq(0).parent().addClass("erro");
                        //     //   $inputs.eq(0).addClass("erro");
                        //     //   return false;
                        //     // }
                        //   }
                        //   else {
                        //     // if($inputs.eq($inputs.length -1).hasClass("erro") && $inputs.eq($inputs.length -1).hasClass("js-active-input") && ( $inputs.eq($inputs.length -1).hasClass("js-active-input") && $inputs.eq($inputs.length -1).hasClass("required") && $inputs.eq($inputs.length -1).val().length === 0) ) {
                        //     //   return false;
                        //     // }
                        //     if($inputs.eq($inputs.length -1).hasClass("js-active-input") || $activeItem.hasClass("js-tab-next")) {
                        //       scrollFormStep("down", true);
                        //       return false;
                        //     }
                        //   }
                        // }
                        // break;
                    case 13: //enter
                        if ($_body.hasClass("js-contact-form-active")) {
                            var $activeItem = $(".form-item-container.active"),
                                $item = $activeItem.find(".required"),
                                defeito = this.defaultValue;
                            return check($item, defeito, 0), $item.hasClass("erro") ? $item.parent(".input").addClass("erro") : $item.parent(".input").removeClass("erro"), $item.hasClass("erro") || $activeItem.find("button").click(), !1
                        }
                        break;
                    case 27: //close (esc)
                        $_body.hasClass("js-modal-open") && $("#lightbox .btn-close-modal").click()
                }
            }), //end keypress
            /*-------------------------------------------------------------------------------------------
                =RESIZE on
                --------------------------------------------------------------------------------------------*/
            $_window.on("resize", $.debounce(500, function() {
                if (
                    //** =recalculate global variables
                    calculateGlobalValues(), $_html.hasClass("no-object-fit") && !$_html.hasClass("edge") && !$_html.hasClass("ie")) {
                    var $element = $(".page-current .element-cover");
                    resizeLikeCover($element)
                }
                $_body.hasClass("home") && 1024 == window.innerWidth ? $(".formacao-list-container a").last().hide() : $(".formacao-list-container a").last().show()
            }))
    });