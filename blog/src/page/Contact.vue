<template>
    <div class="contact">
        <div class="background-image"></div>
        <div class="background-overloay"></div>
        <div class="contact-text">
            <h1 class="contact-title">
                <span v-for="word in title">{{word}}</span>
            </h1>
            <p><span v-for="word in body">{{word}} </span></p>
            <p><span v-for="word in email">{{word}}</span></p>
        </div>
        <div class="test">
            <svg class="intro" viewbox="0 0 400 86">
                <text text-anchor="middle" x="50%" y="30" font-size="40px" class="text text-stroke title" clip-path="url(#text1)">
                    <tspan v-for="word in title">{{word}}</tspan>
                </text>
                <text text-anchor="middle" x="50%" y="50" class="text text-stroke" clip-path="url(#text2)">
                    <tspan v-for="word in body1">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="70" class="text text-stroke" clip-path="url(#text3)">
                    <tspan v-for="word in body2">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="90" class="text text-stroke" clip-path="url(#text4)">
                    <tspan v-for="word in email">{{word}}</tspan>    
                </text> 
                <text text-anchor="middle" x="50%" y="30" font-size="40px" class="text text-stroke text-stroke-2" clip-path="url(#text1)">
                    <tspan v-for="word in title">{{word}}</tspan>
                </text>
                <text text-anchor="middle" x="50%" y="50" class="text text-stroke text-stroke-2" clip-path="url(#text2)">
                    <tspan v-for="word in body1">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="70" class="text text-stroke text-stroke-2" clip-path="url(#text3)">
                    <tspan v-for="word in body2">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="90" class="text text-stroke text-stroke-2" clip-path="url(#text4)">
                    <tspan v-for="word in email">{{word}}</tspan>
                </text>
                 <defs>
                    <clipPath id="text1">
                    <text  text-anchor="middle" x="50%" y="30" font-size="40px" class="text">
                        <tspan v-for="word in title">{{word}}</tspan>
                    </text>
                    </clipPath>
                    <clipPath id="text2">
                    <text text-anchor="middle" x="50%" y="50" class="text">
                        <tspan v-for="word in body1">{{word}} </tspan>
                    </text>
                    </clipPath>
                    <clipPath id="text3">
                    <text text-anchor="middle" x="50%" y="70" class="text">
                        <tspan v-for="word in body2">{{word}} </tspan>
                    </text>
                    </clipPath>
                    <clipPath id="text4">
                    <text text-anchor="middle" x="50%" y="90" class="text">
                        <tspan v-for="word in email">{{word}}</tspan>
                    </text>
                    </clipPath>
                </defs> 
            </svg>
        </div>
    </div>
</template>
<script>
export default {
  name:'contact',
  data() {
      return {
          title:'Contact Me',
          bodyText: 'Bin is here to provide you with more information, answer any questions you may have and create an effective solution for your front-end needs.',
          bodyText1: 'Bin is here to provide you with more information, answer any questions you may have',
          bodyText2: 'and create an effective solution for your front-end needs.',
          email: 'starbing23@gmail.com'
      }
  },
  computed: {
    body() {
        const body = this.bodyText.split(' ');
        return body;
    },
    body1() {
        return this.bodyText1.split(' ')
    },
    body2() {
        return this.bodyText2.split(' ')
    }
  },
  mounted() {
    $('.intro').addClass('go');
  }
}
</script>
<style lang="scss">
.contact {
    width:100%;
    height: calc(100% - 72px);
    overflow: hidden;
    position: relative;
    text-align: center;

    .background-image {
        position: absolute;
        top: 0;
        left: 0;
        // background: url('./../img/contactme.jpg') center no-repeat;
        background-color: white;
        // background-size: cover;
        // filter: sepia(100%);
        width: 100%;
        height: 100%;
    }

    .background-overloay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .contact-text {
        position: relative;
        margin: auto;
        top: 170px;
        width: 700px;
        text-align: center;
        color: white;
        font-size: 18px;

        span:nth-child(6n+1) {
            color: rgba(#0057e7, 0.75);
        }
        span:nth-child(6n+2) {
            color: rgba(#d62d20, 0.75);
        }
        span:nth-child(6n+3) {
            color: rgba(#ffa700, 0.75);
        }
        span:nth-child(6n+4) {
            color: rgba(#0057e7, 0.75);
        }
        span:nth-child(6n+5) {
            color: rgba(#008744, 0.75);
        }
        span:nth-child(6n+6) {
            color: rgba(#d62d20, 0.75);
        }

        span {    
            position: relative;
            top:0px;   
            // transition:0.5s;
            // -moz-transition:0.5s;
            // -webkit-transition:0.5s;
            // -o-transition:0.5s;
        }
        span:hover {
            top: -2px;
            // transform: translate(10px);
            // -moz-transform: translate(10px);
            // -webkit-transform: translate(10px);
            // -o-transform: translate(10px);
        }
    }

    .test {
        text-align: center;

        svg.intro {
            // background: linear-gradient(135deg, #aa3bb1, #582a7e);
            background: white;
            width:100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            // box-shadow: 0 30px 50px -20px rgb(46, 6, 66);
            
            .text { 
                display: none;
            }
            &.go {
                .text {
                font-family: Arial, sans-serif;
                // font-size: 20px;
                // text-transform: uppercase;
                display: block;
                }
                .text-stroke {
                fill: none;
                // stroke: #51256f;
                stroke: #666666;
                stroke-width: 4.5px;
                stroke-dashoffset: -900;
                stroke-dasharray: 900;
                stroke-linecap: butt;
                stroke-linejoin: round;
                animation: dash 2.5s ease-in-out forwards;

                    // tspan {
                        // tspan:nth-child(6n+1) {
                        //     stroke: rgba(#0057e7, 0.75);
                        // }
                        // tspan:nth-child(6n+2) {
                        //     stroke: rgba(#d62d20, 0.75);
                        // }
                        // tspan:nth-child(6n+3) {
                        //     stroke: rgba(#ffa700, 0.75);
                        // }
                        // tspan:nth-child(6n+4) {
                        //     stroke: rgba(#0057e7, 0.75);
                        // }
                        // tspan:nth-child(6n+5) {
                        //     stroke: rgba(#008744, 0.75);
                        // }
                        // tspan:nth-child(6n+6) {
                        //     stroke: rgba(#d62d20, 0.75);
                        // }
                    // }
                }
                .text-stroke:nth-child(2) {
                animation-delay: .3s;
                }
                .text-stroke:nth-child(3) {
                animation-delay: .3s;
                }
                .text-stroke:nth-child(4) {
                animation-delay: .9s;
                }
                .text-stroke-2 {
                // stroke: #f6bdfa;
                stroke: #FFA500;
                    tspan:nth-child(6n+1) {
                        stroke:#0057e7;
                    }
                    tspan:nth-child(6n+2) {
                        stroke:#d62d20;
                    }
                    tspan:nth-child(6n+3) {
                        stroke:#ffa700;
                    }
                    tspan:nth-child(6n+4) {
                        stroke:#0057e7;
                    }
                    tspan:nth-child(6n+5) {
                        stroke:#008744;
                    }
                    tspan:nth-child(6n+6) {
                        stroke:#d62d20;
                    }
                animation-delay: 1.2s;
                }
                .text-stroke:nth-child(6) {
                animation-delay: 1.5s;
                }
                .text-stroke:nth-child(7) {
                animation-delay: 1.5s;
                }
                .text-stroke:nth-child(8) {
                animation-delay: 1.8s;
                }
            }
        }

        @keyframes dash {
            100% {
                stroke-dashoffset: 0;
            }
        }
    }
}
</style>

