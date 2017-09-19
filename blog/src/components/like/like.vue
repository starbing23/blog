<template>
    <span class="heart-container">
        <input :id='id' class="toggle-heart" type="checkbox" v-model="checked" @change="changed"/>
        <label class="heart" :for='id'>❤</label>
    </span>
</template>
<script>
export default {
  name: 'likeComponent',
  data() {
      return {
          checked: false
      }
  },
  props: {
      id: {
          default: ''
      }
  },
  methods: {
    changed() {
        this.$emit('likeChanged', {
            like: this.checked, 
            id: this.id
        });
    }
  }
}
</script>
<style lang="scss">
$bubble-d: 4.5rem;
$bubble-r: .5 * $bubble-d;

$sparkle-d: .375rem;
$sparkle-r: .5*$sparkle-d;

//Math
@function pow($number, $exp) {
  $value: 1;
  @if $exp > 0 {
    @for $i from 1 through $exp {
      $value: $value * $number;
    }
  }
  @else if $exp < 0 {
    @for $i from 1 through -$exp {
      $value: $value / $number;
    }
  }
  @return $value;
}

@function pi() {
  @return 3.14159265359;
}

@function rad($angle) {
  $unit: unit($angle);
  $unitless: $angle / ($angle * 0 + 1);
  // If the angle has 'deg' as unit, convert to radians.
  @if $unit == deg {
    $unitless: $unitless / 180 * pi();
  }
  @return $unitless;
}

@function sin($angle) {
  $sin: 0;
  $angle: rad($angle);
  // Iterate a bunch of times.
  @for $i from 0 through 10 {
    $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
  }
  @return $sin;
}

@function cos($angle) {
  $cos: 0;
  $angle: rad($angle);
  // Iterate a bunch of times.
  @for $i from 0 through 10 {
    $cos: $cos + pow(-1, $i) * pow($angle, 2 * $i) / fact(2 * $i);
  }
  @return $cos;
}

@function tan($angle) {
  @return sin($angle) / cos($angle);
}

@function fact($number) {
  $value: 1;
  @if $number > 0 {
    @for $i from 1 through $number {
      $value: $value * $i;
    }
  }
  @return $value;
}

//Math

@mixin sparkles($k) {
    $shadow-list: ();
    $n-groups: 7;
    $group-base-angle: 360deg/$n-groups;
    $group-distr-r: (1 + $k*.25)*$bubble-r;
    $n-sparkles: 2;
    $sparkle-base-angle: 360deg/$n-sparkles;
    $sparkle-off-angle: 60deg; // offset angle from radius
    $spread-r: -$k*$sparkle-r;
    
    @for $i from 0 to $n-groups {
        $group-curr-angle: $i*$group-base-angle - 90deg;
        $xg: $group-distr-r*cos($group-curr-angle);
        $yg: $group-distr-r*sin($group-curr-angle);
        
        @for $j from 0 to $n-sparkles {
            $sparkle-curr-angle: $group-curr-angle + 
                $sparkle-off-angle + $j*$sparkle-base-angle;
            $xs: $xg + $sparkle-d*cos($sparkle-curr-angle);
            $ys: $yg + $sparkle-d*sin($sparkle-curr-angle);
            
            $shadow-list: $shadow-list, $xs $ys 0 $spread-r 
                hsl(($i + $j)*$group-base-angle, 100%, 75%);
        }
    }
    
    box-shadow: $shadow-list;
}

@mixin bubble($ext) {
    transform: scale(1);
    border-color: #cc8ef5;
    border-width: $ext;
}

.heart-container {
    display: inline-flex;
    height: 1.5em;
    width: 1.5em;
    justify-content: center;
    font: 1rem;
    vertical-align: middle;

    .toggle-heart {
        position: absolute;
        left: -100vw;

        &:checked + label {
            color: #e2264d;
            will-change: font-size;
            animation: heart 1s cubic-bezier(.17, .89, .32, 1.49);

            &:before, &:after {
                animation: inherit;
                animation-timing-function: ease-out;
            }

            &:before {
                will-change: transform, border-width, border-color;
                animation-name: bubble;
            }

            &:after {
                will-change: opacity, box-shadow;
                animation-name: sparkles;
            }
        }

        &:focus + label {
            text-shadow: 0 0 3px white, 
                0 1px 1px white, 0 -1px 1px white, 
                1px 0 1px white, -1px 0 1px white;
        }
    }

    label {
        position: relative;
        z-index: 100;
        align-self: center;
        color: #888;
        // filter: grayscale(1);
        font-size: 1.3rem;
        user-select: none;
        cursor: pointer;
        margin-bottom: 0px;

        &:before,
        &:after {
            position: absolute;
            z-index: -1;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            content: '';
        }

        &:before {
            box-sizing: border-box;
            border: solid $bubble-r #e2264d;
            margin: -$bubble-r;
            width:$bubble-d;
            height: $bubble-d;
            transform: scale(0);
        }

        &:after {
            margin: -$sparkle-r;
            width: $sparkle-d; 
            height: $sparkle-d;
            @include sparkles(1);
        }
    }

    @keyframes heart {
        0%, 17.5% {
            font-size: 0;
        }
    }

    @keyframes bubble {
        15% {@include bubble($bubble-r);}
        30%, 100% {@include bubble(0);}
    }

    @keyframes sparkles {
        0%, 20% { opacity: 0; }
        25% {
            opacity: 1;
            @include sparkles(0);
        }
    }
}
</style>

