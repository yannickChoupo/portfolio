///////////Theme List /////////////////////

// $themes: (
//     def: (
//     pri: #000000,
//     sec: #1c1c1e,
//     ter: #b71540
// ),
// dark: (
//     pri: rgba(255, 255, 255 ,0.5),
//     sec: #0a3d62,
//     ter: #b71540
// ),
// sky: (
//     pri: #DAC0FF,
//     sec: #605EFF,
//     ter: #2A40E8
// )
//
// );
///////////////////////////////////////////////////

///////////////////////////////////////////////////////
/// GenerateThemes variables ///////////////////////

// color-order: ();
// $lib: ();
// @function generateThemesVariable($themes) {
//     $colorList: ();
//     $classSelectorList: ();
//     $newList: ();
//     $themeNameList: getThemeNamesList($themes);
//
// @each $themeName in getThemeNamesList($themes) {
//         $actualList: map.get($themes, $themeName);
//     @each $order in getThemeNamesList($actualList) {
//             $classSelector: $themeName - $order;
//             $classSelectorList: list.append($classSelectorList, $classSelector);
//             $colorList: list.append($colorList, map.get($actualList, $order));
//             $newList: list.append($newList, ($classSelector:map.get($actualList, $order)), comma);
//         }
//     }
// @return $newList;
// }
//
// $lib: list.append($lib, generateThemesVariable($themes));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
/*
  Gives a List of the different primary colors available in the list

  @param {$order} / pri , sec , ter;

  @return {list}
 */
// @function get-colors-list($order) {
//     $colors-list: ();
// @each $keyValueList in $lib {
//     @each $list in $keyValueList {
//         @each $name, $color in $list {
//             @if string.index($name, $order) {
//                     $colors-list: list.append($colors-list, $color, comma);
//                 @debug $color;
//                 }
//             }
//         }
//     }
// @return $colors-list;
// }
//
// @function get-key-value-pair-without($order) {
//     $colors-list: ();
// @each $keyValueList in $lib {
//     @each $list in $keyValueList {
//         @each $name, $color in $list {
//             @if not string.index($name, $order) {
//                     $colors-list: map.merge($colors-list, $list);
//                 }
//             }
//         }
//     }
// @return $colors-list;
// }
// @function get-key-value-pair-with($order) {
//     $colors-list: ();
// @each $keyValueList in $lib {
//     @each $list in $keyValueList {
//         @each $name, $color in $list {
//                 //@if string.index($name, $order) {
//                 //@debug "key: #{$key}";
//                 //@debug "color: #{$value}"
//                 $colors-list: map.merge($colors-list, $list);
//                 //}
//             }
//         }
//     }
// @return $colors-list;
// }
// @function get-key-value-pair() {
//     $colors-list: ();
// @each $keyValueList in $lib {
//     @each $list in $keyValueList {
//         @each $name, $color in $list {
//                 //@if string.index($name, $order) {
//                 //@debug "key: #{$key}";
//                 //@debug "color: #{$value}"
//                 $colors-list: map.merge($colors-list, $list);
//                 //}
//             }
//         }
//     }
// @return $colors-list;
// }
//@mixin set-color {
//  $count: 1;
//  @each $keyValueList in $lib {
//    @each $list in $keyValueList {
//      @each $name, $color in $list {
//        .cl-#{$name} {
//          color: $color;
//        }
//      }
//    }
//  }
//}

//@mixin set-border-bottom-color {
//  $count: 1;
//  @each $keyValueList in $lib {
//    @each $list in $keyValueList {
//      @each $name, $color in $list {
//        .bb-#{$name} {
//          &.active {
//            color: $color;
//            border-bottom: 3px solid $color;
//          }
//
//          &:hover {
//            color: $color;
//            border-bottom: 3px solid $color;
//          }
//        }
//      }
//    }
//  }
//}

//@mixin set-bg-oh-color {
//  $count: 1;
//  @each $keyValueList in $lib {
//    @each $list in $keyValueList {
//      @each $name, $color in $list {
//        .bg-oh-#{$name} {
//          &.active {
//            color: white;
//            background-color: $color;
//          }
//
//          &:hover {
//            color: white;
//            background-color: $color;
//          }
//        }
//      }
//    }
//  }
//}

//$list: get-colors-list("pri");
//@debug $list;
//@mixin set-tooltip-before-after-color {
//  $count: 1;
//  @each $keyValueList in $lib {
//    @each $list in $keyValueList {
//      @each $name, $color in $list {
//        .bfa-bg-#{$name} {
//          &::before {
//            background-color: $color;
//          }
//
//          &::after {
//            border: 10px solid transparent;
//            border-left-color: $color;
//          }
//        }
//      }
//    }
//  }
//}

///////////////////////////////////////////////////////////////////////
// @mixin generate {
//  @each $name, $color in get-key-value-pair-with(ter) {
//    //@debug "name : #{$name}";
//    //.bg-oh-#{$name}-ter  {
//    &:hover::before {
//      transform: scale(1);
//      background-color: $color;
//    }
//    &:hover::after {
//      border: 10px solid red;
//      //border-left-color: quoted($color);
//    }
//  }
//}
//@include set-color;
//@include set-border-bottom-color;
//@include set-bg-oh-color;
//@include set-tooltip-before-after-color;
