<template>
    <div class="contact">
        <div class="background-image"></div>
        <div class="background-overloay"></div>
        <div class="contact-text">
            <svg class="intro" viewbox="0 0 400 86">
                <text text-anchor="middle" x="50%" y="30" font-size="40px" class="text text-stroke title" clip-path="url(#text1)">
                    <tspan v-for="word in title">{{word}}</tspan>
                </text>
                <text text-anchor="middle" x="50%" y="70" font-size="20px" class="text text-stroke" clip-path="url(#text2)">
                    <tspan v-for="word in body1">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="100" font-size="20px" class="text text-stroke" clip-path="url(#text3)">
                    <tspan v-for="word in body2">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="130" font-size="20px" class="text text-stroke" clip-path="url(#text4)">
                    <tspan v-for="word in email">{{word}}</tspan>    
                </text> 
                <text text-anchor="middle" x="50%" y="30" font-size="40px" class="text text-stroke text-stroke-2" clip-path="url(#text1)">
                    <tspan v-for="word in title">{{word}}</tspan>
                </text>
                <text text-anchor="middle" x="50%" y="70" font-size="20px" class="text text-stroke text-stroke-2" clip-path="url(#text2)">
                    <tspan v-for="word in body1">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="100" font-size="20px" class="text text-stroke text-stroke-2" clip-path="url(#text3)">
                    <tspan v-for="word in body2">{{word}} </tspan>
                </text>
                <text text-anchor="middle" x="50%" y="130" font-size="20px" class="text text-stroke text-stroke-2" clip-path="url(#text4)">
                    <tspan v-for="word in email">{{word}}</tspan>
                </text>
                 <defs>
                    <clipPath id="text1">
                    <text  text-anchor="middle" x="50%" y="30" font-size="40px" class="text">
                        <tspan v-for="word in title">{{word}}</tspan>
                    </text>
                    </clipPath>
                    <clipPath id="text2">
                    <text text-anchor="middle" x="50%" y="70" font-size="20px" class="text">
                        <tspan v-for="word in body1">{{word}} </tspan>
                    </text>
                    </clipPath>
                    <clipPath id="text3">
                    <text text-anchor="middle" x="50%" y="100" font-size="20px" class="text">
                        <tspan v-for="word in body2">{{word}} </tspan>
                    </text>
                    </clipPath>
                    <clipPath id="text4">
                    <text text-anchor="middle" x="50%" y="130" font-size="20px" class="text">
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
        //   bodyText: 'Bin is here to provide you with more information, answer any questions you may have and create an effective solution for your front-end needs.',
          bodyText1: 'Bin is here to provide you with more information, answer any questions you may have',
          bodyText2: 'and create an effective solution for your front-end needs.',
          email: 'starbing23@gmail.com'
      }
  },
  computed: {
    // body() {
    //     const body = this.bodyText.split(' ');
    //     return body;
    // },
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
        background-color: white;
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
        text-align: center;

        svg.intro {
            background: white;
            width:100%;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            
            .text { 
                display: none;
            }
            &.go {
                .text {
                font-family: Arial, sans-serif;
                display: block;
                }
                .text-stroke {
                    fill: none;
                    stroke: #666666;
                    stroke-width: 4.5px;
                    stroke-dashoffset: -900;
                    stroke-dasharray: 900;
                    stroke-linecap: butt;
                    stroke-linejoin: round;
                    animation: dash 1.8s ease-out forwards;
                }
                .text-stroke:nth-child(2) {
                    animation-delay: .3s;
                }
                .text-stroke:nth-child(3) {
                    animation-delay: .3s;
                }
                .text-stroke:nth-child(4) {
                    animation-delay: .6s;
                }
                .text-stroke-2 {
                    animation-delay: .9s;

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
                }
                .text-stroke:nth-child(6) {
                    animation-delay: 1.2s;
                }
                .text-stroke:nth-child(7) {
                    animation-delay: 1.2s;
                }
                .text-stroke:nth-child(8) {
                    animation-delay: 1.5s;
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

