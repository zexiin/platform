
/**********

this file contains map strings and data.

**********/


// note: map_bg, map_overlay, and bg_color are optional



var mapArr = [];

mapArr.push({
  level: 1,
  row: 13, 
  col: 36,
  map: "\
]                                 [X\
]                                 [X\
]                      t          [X\
]                     dmb         [X\
]                                 [X\
]              db           %%    [X\
]                 3          %    [X\
]           %     dmmb  5  o      [X\
]         o             dmmmmb    [X\
]~~~~~~~r====k   J       P        [X\
]   o   ixxxxl  !    %        !   [X\
--------xxxxxx======================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  map_bg: "\
                                    \
                                    \
                       t            \
                                    \
                                    \
                                    \
                                    \
                                    \
                                 123\
 ~~~~~~~r    k                   456\
 wwwwwwwi    l   J               789\
 wwwwwww                            \
                                    ",
  map_overlay: "\
                                    \
                                    \
                       t            \
                                    \
                                    \
                                    \
                                    \
                                    \
                               123  \
 ~~~~~~~r    k                 456  \
 wwwwwwwi    l   J             789  \
                                    \
                                    "

   
});
mapArr.push({
  level: 2,
  row: 27, 
  col: 110,
  map: "\
xxxxxxxxxxl                                                                                             ixxxx]\
____xxxxxxl                                                                                             ixxxx]\
ooooixxxxxl                                                                                             ixxxx]\
ooooixxxxxl                                                                                  o          ixxxx]\
ooooL_____K                     o        o                                                dmmmmmb       ixxxx]\
oooo              J            dmb      dmb   8                                 R            R          ixxxx]\
oooo                     o                    dmmmmm==k                 o          4      4     4     t ixxxx]\
==========l       dmmmmmmb                          ixl          ixxmmmb        r=======================xxxxx]\
xxxxxxxxxxl                                         ixl    o     ixl          o ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   3                     ixl!        !ixl        dmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb       o o o o    ixl  o       ixl            ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                             7    3      ixl          ixl o          ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                       o    dmmmIIImmb   ixl!       o!ixxmmb         ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl     IIIII                               ixl          L_K            ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb                  ixl                      o  ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl               o                         ixl     o               dmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxlP                                        ixl                         ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl            dmmb                         ixl                         ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxx========k~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ixl            r============xxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxl                                ixl!!!!===!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxl                                ixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxl!  !  !  !  !  !  !  !  !  !  ! ixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxx--------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
!!!!!!!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]",
  map_bg: "\
xxxxxxxxxxl                                                                                             xxxxx]\
xxxxxxxxxxx                                                                                  123        xxxxx]\
ooooxxxxxxx                                                                                  456        xxxxx]\
ooooxxxxxxx                                                                                  789        xxxxx]\
ooooxxxxxxx                     o        o                                                dmmmmmb       xxxxx]\
ooooxxxxxxx                    dmb      dmb                                     R            R          xxxxx]\
ooooxxxxxxl       J      o                    dmmmmm==k                 o        v     v v            t xxxxx]\
==========l       dmmmmmmb                          ixl          ixxmmmb        ========================xxxxx]\
xxxxxxxxxxl                                         ixl    o     ixl          o ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                                         ixl          ixl        dmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb       o o o o    ixl  o       ixl            ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                                         ixl          ixl o          ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                       o    dmmmIIImmb   ixl        o ixxmmb         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl     IIIII                               ixl          xxl            ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb                  ixl                      o  ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl               o                         ixl     o               dmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxlP                                        ixl                         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl            dmmb                         ixl                         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl========k~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ixl            dmmmmmmmmmmmmxxlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxl    ===     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
                      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]",
  map_overlay: "\
xxxxxxxxxxl                                                                                             xxxxx]\
xxxxxxxxxxx                                                                                             xxxxx]\
ooooxxxxxxx                                                                                             xxxxx]\
ooooxxxxxxx                                                                                             xxxxx]\
ooooxxxxxxx                     o        o                                                dmmmmmb       xxxxx]\
ooooxxxxxxx                    dmb      dmb                                     R            R          xxxxx]\
ooooxxxxxxl       J      o                    dmmmmm==k                 o        v     v v            t xxxxx]\
==========l       dmmmmmmb                          ixl          ixxmmmb        ========================xxxxx]\
xxxxxxxxxxl                                         ixl    o     ixl          o ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                                         ixl          ixl        dmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb       o o o o    ixl  o       ixl            ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                                         ixl          ixl o          ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                       o    dmmmIIImmb   ixl        o ixxmmb         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl     IIIII                               ixl          xxl            ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb                  ixl                      o  ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl               o                         ixl     o               dmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxlP                                        ixl                         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl            dmmb                         ixl                         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl========k~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ixl            dmmmmmmmmmmmmxxlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxx wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww xl    ===     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxx wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxx wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxx                                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
                      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]",
   
});
mapArr.push({
  level: 3,
  row: 24,
  col: 48,
  bg_color: "#3f8f6e",
  map: "\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l ooooooooooooooooooooooooooooo               ix\
ltooooooooooooooooooooooooooooo               ix\
x==================================mmb        ix\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl           ix\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl        dmmxx\
xxx______________________xxxxxxxxxl           ix\
xxl                      ixxxxxxxxxmmb        ix\
xxl                      L________K           ix\
xxl                         R              dmmxx\
xxl   P                                    !!!ix\
xxl~~~~~~~~~~~~~~~~~~~~~~r====================xx\
xxl                      ixxxxxxxxxxxxxxxxxxxxxx\
xxl                4     ixxxxxxxxxxxxxxxxxxxxxx\
xxl        6      y------xxxxxxxxxxxxxxxxxxxxxxx\
xxx---------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

  map_bg: "\
l.............................................ix\
l...................{}........................ix\
l...{}.........C.........C....................ix\
la....a....a....a....a....a....a....a....a....ix\
e:bcde:bcde:bcde:bcde:bcde:bcde:bcde:bcde:bcdeix\
fgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgix\
FGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGix\
123123123  123123 123123                      ix\
456456456  456456 456456                      ix\
789789789  789789 789789   v    v             ix\
x==================================mmb        ix\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl           ix\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl        dmmxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl  v        ix\
xxx______________________xxxxxxxxxxmmb        ix\
xxl                      L________K           ix\
xxl                                        dmmxx\
xxl                                           ix\
xxl~~~~~~~~~~~~~~~~~~~~~~r====================xx\
xxlwwwwwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxxxxxx\
xxlwwwwwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxxxxxx\
xxlwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxx---------------ixxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  map_overlay: "\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
l                                             ix\
  123123  123 123  123 123                    ix\
  456456  456 456  456 456                    ix\
  789789  789 789  789 789                    ix\
x==================================mm         ix\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl           ix\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl         mmxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl           ix\
xxx______________________xxxxxxxxxxmm         ix\
xxl                      L________K           ix\
xxl                                         mmxx\
xxl                                           ix\
xxl~~~~~~~~~~~~~~~~~~~~~~r====================xx\
xxlwwwwwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxxxxxx\
xxlwwwwwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxxxxxx\
xxlwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxx---------------ixxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  

 });
mapArr.push({
  level: 4,
  row: 21,
  col: 35,
  map: "\
%                        o        %\
%                                 %\
%  dmb          o    o            %\
%                        v    o   %\
%           o          dmb        %\
%       o      4   o         o    %\
%          o   dmmmb   o     o t o%\
%    2             o     o    dmb %\
% o  dmb  o    o    o  o    %     %\
%            vvv     o   o      o %\
%    o   o  dmb        vv  o      %\
%                   o  dmb        %\
%  o    4   o  o   2        o     %\
%       dmmmb  P   dmb            %\
%                 ! o       o     %\
%   o    %     dmmb o  o5!o       %\
%        %  !  o        dmmmmb    %\
%  !    r====kJ     db            %\
%!!!!!!!ixxxxl!!!!!!!!!!!!!!!!!!!!%\
=========xxxxxx====================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  

 });


mapArr.push({
  level: 5,
  row: 21,
  col: 35,
  map: "\
]                        o        [\
]                                 [\
]  dmb          o    o            [\
]                        v    o   [\
]        o          dmb           [\
]    o         5o         o       [\
]    P     o   dmmmb   o     o   o[\
]                  o     o    dmb [\
] o  dmb  o    o    o  o          [\
]            vvv     o   o      o [\
]    o   o  dmb        vv  o      [\
]                   o  dmb        [\
]v o    4   o  o            o     [\
]       dmmmb      dmb            [\
]              ! o3      o        [\
]      o    %     dmmb o 5ot!o    [\
]o 9     %  !  o    o   dmmmmb    [\
]! dmmmmmmmmmb o o      o  o  o   [\
]!!!!!!!ixxxxl!!!!!!!!!!!!!!!!!!!![\
========xxxxxx=====================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  
 });

mapArr.push({
  level: 6,
  row: 18,
  col: 60,
  map:"\
X]                                                    [xxxx]\
X]                                                    [xxxx]\
X]                                     t              [xxxx]\
X]                 o                %%%%              [xxxx]\
X]                                         %          [xxxx]\
X]                     2        %                     [xxxx]\
X]                     dmb                            [xxxx]\
X]           o  4     %                               [xxxx]\
X]                               %                    [xxxx]\
X]                db                 5                [xxxx]\
X]    o          %                                    [xxxx]\
X]                                                    [xxxx]\
X]         db                           %             [xxxx]\
X]  P                  %                              [xxxx]\
X]                        9                           [xxxx]\
========k                 dmmmmmmmmb                  [xxxx]\
xxxxxxxxl!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!![xxxx]\
xxxxxxxxx=============================================[xxxx]",


})

mapArr.push({
  level: 7,
  row: 22,
  col: 75,
  map: "\
X]                                                    ixxxxxxxxxxxxxxxxxxx]\
X]                                                    ixxxxxxxxxxxxxxxxxxx]\
X]                                                    ixxxxxxxxxxxxxxxxxxx]\
X]                                                    ixxxxxxxxxxxxxxxxxxx]\
X]                                          3  t      ixxxxxxxxxxxxxxxxxxx]\
X]                                          dmmmb     ixxxxxxxxxxxxxxxxxxx]\
X]                                          %     o   ixxxxxxxxxxxxxxxxxxx]\
X]                                  %       %    dmb  ixxxxxxxxxxxxxxxxxxx]\
X]                 o                %6      %         ixxxxxxxxxxxxxxxxxxx]\
X]                db             dmmmmmmmmmmb         ixxxxxxxxxxxxxxxxxxx]\
X]                     o                 %      o     ixxxxxxxxxxxxxxxxxxx]\
X]                   db            %   o %      %     ixxxxxxxxxxxxxxxxxxx]\
X]                                 %     %            ixxxxxxxxxxxxxxxxxxx]\
X]           2           o         %  !      o        ixxxxxxxxxxxxxxxxxxx]\
X]           dmb                  r==============k    ixxxxxxxxxxxxxxxxxxx]\
X]                  db     dmmmmmmxxxxxxxxxxxxxxxlo  dxxxxxxxxxxxxxxxxxxxx]\
X]                                ixxxxxxxxxxxxxxl  o ixxxxxxxxxxxxxxxxxxx]\
X]               o       %        ixxxxxxxxxxxxxxxb   ixxxxxxxxxxxxxxxxxxx]\
X]  P                  9   o    o ixxxxxxxxxxxxxxl   dxxxxxxxxxxxxxxxxxxxx]\
X]           o       r============xxxxxxxxxxxxxxxl  o ixxxxxxxxxxxxxxxxxxx]\
=====================xxxxxxxxxxxxxxxxxxxxxxxxxxxxl3  oixxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx====xxxxxxxxxxxxxxxxxxxx]",


});

mapArr.push({
  level: 8,
  row: 27,
  col: 110,
  map: "\
xxxxxxxxxxl                                                                                             xxxxx]\
xxxxxxxxxxx                                                                                             xxxxx]\
ooooxxxxxxx                                                                                             xxxxx]\
ooooxxxxxxx                                                                                  o          xxxxx]\
ooooxxxxxxx                     o                                                         dmmmmmb       xxxxx]\
ooooxxxxxxx                    dmb            8                                 R            R          xxxxx]\
ooooxxxxxxl        5     o                    dmmmmm==k                 o          4      4     4     t xxxxx]\
====xxxxxxl       dmmmmmb                           ixl          ixxmmmb     o  i=======================xxxxx]\
xxxxxxxxxxl                                         ixl    o     ixl         dmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   3                     ixl!        !ixl            ixxlxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb       o o o o    ixl  o       ixl   o        ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                             7    3      ixl          ixxmmb         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                       o     dmmmmmmmb   ixl!       o!ixl            ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                                         ixl          xxl            ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                    dmb                  ixl                      o  ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl               o                         ixl     o                dmmxxlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxlP                                        ixl                         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl            dmb                          ixl                         ixlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl=========                                ixl            dmmmmmmmmmmmmxxlxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ixl!!!!===!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
!!!!!!!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]",
   
});

mapArr.push({
  level: 9,
  row: 18,
  col: 60,
  map:"\
X]                                                    ixxxx]\
X]                                       o            ixxxx]\
X]                                                    ixxxx]\
X]                                         o          ixxxx]\
X]                               o         %          ixxxx]\
X]                     2        %                     ixxxx]\
X]                  o  dmb                       o    ixxxx]\
X]                    %                       o       ixxxx]\
X]                 3                            o     ixxxx]\
X]                r=====k~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ixxxx]\
X]                ixxxxxl                   4         ixxxx]\
X]                ixx__xl     5                       ixxxx]\
X]         dmb    ixlooLK                      %      ixxxx]\
X]  P   %~~~~~~~~~ixloo             J                 ixxxx]\
X]     !%       o ixl     9                           ixxxx]\
========%  o  o   ixx===k                        t    ixxxx]\
xxxxxxxx%!!!!!!!!!ixxxxxl!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ixxxx]\
xxxxxxxxx=============================================ixxxx]",
  map_bg: "\
X]                                                    ixxxx]\
X]                                       o            ixxxx]\
X]                                                    ixxxx]\
X]                                         o          ixxxx]\
X]                               o         %          ixxxx]\
X]                              %                     ixxxx]\
X]                  o  dmb                       o    ixxxx]\
X]                    %                       o       ixxxx]\
X]                                              o     ixxxx]\
X]                r=====k~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ixxxx]\
X]                ixxxxxlwwwwwwwwwwwwwwwwwwwwwwwwwwwwwixxxx]\
X]                ixxxxxlwwwwwwwwwwwwwwwwwwwwwwwwwwwwwixxxx]\
X]         dmb    ixxwwxlwwwwwwwwwwwwwwwwwwwwwwwwwwwwwixxxx]\
X]      %~~~~~~~~~ixxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwixxxx]\
X]     !%wwwwwwwwwixxwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwixxxx]\
========%wwwwwwwwwixxxxxlwwwwwwwwwwwwwwwwwwwwwwwwwwwwwixxxx]\
xxxxxxxx%wwwwwwwwwixxxxxlwwwwwwwwwwwwwwwwwwwwwwwwwwwwwixxxx]\
xxxxxxxxx=============================================ixxxx]"


});

mapArr.push({
  level: 10,
  row: 21,
  col: 35,
  map: "\
]                                 [\
]                                 [\
]                                 [\
]   P                         o   [\
]                o                [\
]IIIIIIIIIIIIIIIIIIIIIdmmmmbIIIIII[\
]                                 [\
] J     o           5             [\
]IIIIIIIIIIIdmmbIIIIIIIIIIIIIIIIII[\
]                                 [\
]            o      J             [\
]IIIIIIIIIIIIIIIIIIIIIdmmmbIIIIIII[\
]                                 [\
]   R            o              o [\
]IIIIIIIIII%%%%%%IIIIIIIIIIIIIIIII[\
]                                 [\
]    o   R         o      o    t  [\
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIdmbII\
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\
===================================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  
 });
