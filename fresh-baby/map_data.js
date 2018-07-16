
/**********

this file contains map strings and data.

**********/


// note: map_bg, map_overlay, and bg_color are optional



var mapArr = [];

mapArr.push({
  level: 1,
  row: 15, 
  col: 36,
  map: "\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]                                 [X\
]    P                            [X\
] U        t                      [X\
====================================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
});


mapArr.push({
  level: 2,
  row: 15, 
  col: 36,
  map: "\
]                                 [X\
]                                 [X\
]      t                          [X\
]      db                         [X\
]            3                    [X\
]            dmmb                 [X\
]                                 [X\
]                    dmb          [X\
]                                 [X\
]             4                   [X\
]             dmmmb               [X\
]    P                     U      [X\
]                                 [X\
====================================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
});

mapArr.push({
  level: 3,
  row: 27, 
  col: 110,
  map: "\
xxxxxxxxxxl                                                                                             ixxxx]\
____xxxxxxl                                                                                             ixxxx]\
ooooixxxxxl                                                                                             ixxxx]\
ooooixxxxxl                                                                                  o          ixxxx]\
ooooL_____K                     o        o                                                dmmmmmb       ixxxx]\
oooo              J            dmb      dmb   8                                 R            R          ixxxx]\
oooo                     o                   dmmmmmm==k                 o          4      4     4     t ixxxx]\
==========k       dmmmmmmb                          ixl          r==mmmb        r=======================xxxxx]\
xxxxxxxxxxl                             %%          ixl    o     ixl          o ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   3                     ixl!        !ixl        dmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb       o o o o    ixl  o       ixl            ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                             7    3      ixl          ixl o          ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                       o    dmmmIIImmb   ixl!       o!ixxmmmmb       ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl     IIIII                               ixl          L_K            ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl                   dmmb                  ixl                      o  ixxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
xxxxxxxxxxl               o                         ixl     o              dmmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]\
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
  level: 4,
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
level: 5,
row: 15,
col: 88,
map: "\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%~~~~~~~~~~%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%t         %%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%                     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      %%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%   P      8                %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                       %%%\
%%%%          %%%%%%%%%%%      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%         %%%\
%%%%%%%%%%%%%%%%%%%%%%%%%      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%~~~~~~~~~%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      %%%\
%%%%%%%%%%%%%%%%%%%%%%%%%                   %%%%%%%%%%%%%% o    %%%%%%%%%%%%         %%%\
%%%%%%%%%%%%%%%%%%%%%%%%% 8                 %%%%%%%%%%%%%%    o %%%%%%%%%%%%         %%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      %%%%%%%%%%%%%%~~~~~~%%%%%%%%%%%%     %%%%%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      %%%%%%%%%%%%%%   %%%%%%%%%%%%%%%         %%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      8                                        %%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
map_bg: "\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%          %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%~~~~~~~~~~%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%wwwwwwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%t         %%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%wwwwwwwwwwwwwwwwwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      %%%%%%%%%%%%%%%%%%%%%%%%%\
%%%%wwwwwwwwwwwwwwwwwwwwwwwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                       %%%\
%%%%wwwwwwwwww%%%%%%%%%%%wwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%         %%%\
%%%%%%%%%%%%%%%%%%%%%%%%%wwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%~~~~~~~~~%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%wwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%wwwwwwwww%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%wwwwwwwwwwwwwwwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%wwwwwwwww%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%wwwwwwwwwwwwwwwwwww%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%wwwwwwwww%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%wwwwww%%%%%%%%%%%%%%      %%%%%%%%%%%%wwwwwwwww%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%wwwwww%%%%%%%%%%%%%%www%%%%%%%%%%%%%%%wwwwwwwww%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww%%%\
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
});
mapArr.push({
  level: 6,
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
  level: 7,
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
X]U    !%       o ixl     9                           ixxxx]\
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
xxxxxxxxx=============================================ixxxx]",
map_overlay: "\
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
  level: 8,
  row: 44,
  col: 98,
  bg_color: "#3f8f6e",
  map: "\
l                                                                                              ixl\
l                                                                                              ixl\
l                                                                                              ixl\
l                                                         J                                    ixl\
l                                                          4      4                            ixl\
l                                               2 o     dmmmmmmmmmmm======mmmmmb               ixl\
l                                               dmb                 ixxxxl                     ixl\
l                                                  4   o            ixxxxl                     ixl\
l                                                  dmmmb            ixxxxl          dmmmb      ixl\
l                                                         dmb       ixxxxl       J             ixl\
l                                 J            J              4     ixxxxl           4     ooo ixl\
l                                                         r=========xxxxxl!o     ==============xxl\
l                ==    o        dmmmmmmmmmmm==============xxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l                il                         ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l                il       dmb               ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl     o!ixxxxxxxxxxxxxxxl\
l                ilooo 8      5             ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l                il=================        ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl!o     ixxxxxxxxxxxxxxxl\
l                L__________________   4  o ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l                                      dmmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l                                           ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l               4     6      8 o     o      ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl     o!ixxxxxxxxxxxxxxxl\
============================================ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl!o     ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx_______________________________l       ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo                                    ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo                                    ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo4        4                          ixxxxxxxxxxxxxxxl\
lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmb      ixxxxxxxxxxxxxxxl\
l                                                                                ixxxxxxxxxxxxxxxl\
l                                                                          o     ixxxxxxxxxxxxxxxl\
l                                                                        o   dmmmxxxxxxxxxxxxxxxxl\
l                                                         P    o  4    o                        ix\
l                                                           o   dmmmmmb   o                     ix\
l                                                       ====k               o2   o              ix\
l                                                  o 2  ixxxl             dmmmmb   o            ix\
l                                                o   dmmixxxl                        o          ix\
l                                         o  3          ixxxl                     dmmb R     oooix\
l                                       o    dmmb       ixxxl                                oooix\
l                                                       ixxxl                  =================ix\
l   J      R                         3                  ixxxl~~~~~~~~~~~~~~~~~~ixxxxxxxxxxxxxxxxxx\
lt                          ===     dmmmb               ixxxl                  ixxxxxxxxxxxxxxxxxx\
l====================k      ixl~~~~~~~~~~~~~~~~~~~~~~~~~ixxxl                  ixxxxxxxxxxxxxxxxxx\
lxxxxxxxxxxxxxxxxxxxxl      ixl                         ixxxl                  ixxxxxxxxxxxxxxxxxx\
lxxxxxxxxxxxxxxxxxxxxl!!!!!!ixl!!!!!!!!!!!!!!!!!!!!!!!!!ixxl!!!!!!!!!!!!!!!!!!!ixxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

map_bg:"\
l..............................................................................................ixl\
l..............................................................................................ixl\
l............................................................{}................................ixl\
l...................................................................................{}.........ixl\
l.......................................................{}.........a....a....a....a....a....a..ixl\
l.............C..{}................................................:bcde:bcde:bcde:bcde:bcde:bcixl\
l.........................{}................................{}......ixxxxlfgfgfgfgfgfgfgfgfgfgfixl\
l............................................{}.....................ixxxxlFGFGFGFGFGFGFGFGFGFGFixl\
l....................{}............{}..................{}...........ixxxxl          d123b123   ixl\
l................{}........{}.......................................ixxxxl       J   456 456   ixl\
l.......................................C...........................ixxxxl           789 789oo ixl\
l............{}............................................=========xxxxxl!o     ==============xxl\
l...............................dmmmmmmmmmmm==============xxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l.a....a....a....a....a....a....a....a....a.ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
le:bcde:bcde:bcde:bcde:bcde:bcde:bcde:bcde:bcxxxxxxxxxxxxxxxxxxxxxxxxxxxxl     o!ixxxxxxxxxxxxxxxl\
lfgfgfgfgfgfgfgfgfgfgfgfgfgfggfgffgfgfgfgfgfg   456                              ixxxxxxxxxxxxxxxl\
lFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFG   789     v v   v  v  v v          ixxxxxxxxxxxxxxxl\
l                L__________________      o ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l   123 123 123  123 123               dmmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
lP  456 456 456  456 456                    ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l   789 789 789 v789 789       o     o      ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl     o!ixxxxxxxxxxxxxxxl\
============================================ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl!o     ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx_______________________________l       ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo                                    ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo          J                         ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo                       v            ixxxxxxxxxxxxxxxl\
lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmb      ixxxxxxxxxxxxxxxl\
l                                                                              v ixxxxxxxxxxxxxxxl\
l                                                                            dmmmxxxxxxxxxxxxxxxxl\
l                                                                                               ix\
l                                                                mmmmm                          ix\
l                                                       ====k                                   ix\
l                                                       ixxxl              mmmm                 ix\
l                                                     mmixxxl                              123  ix\
l                                                       ixxxl                      mm  R   456ooix\
l                                             mm        ixxxl                     v        789ooix\
l        123                                            ixxxl                  =================ix\
l   J    456                v                           ixxxlwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxx\
lt       789      vv        ===       mm                ixxxlwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxx\
l====================k      ixl                         ixxxlwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxx\
lxxxxxxxxxxxxxxxxxxxxl      ixlwwwwwwwwwwwwwwwwwwwwwwwwwixxxlwwwwwwwwwwwwwwwwwwixxxxxxxxxxxxxxxxxx\
lxxxxxxxxxxxxxxxxxxxxl!!!!!!ixl!!!!!!!!!!!!!!!!!!!!!!!!!ixxl!!!!!!!!!!!!!!!!!!!ixxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
map_overlay:"\
l..............................................................................................ixl\
l..............................................................................................ixl\
l............................................................{}................................ixl\
l...................................................................................{}.........ixl\
l.......................................................{}.........a....a....a....a....a....a..ixl\
l.............C..{}................................................:bcde:bcde:bcde:bcde:bcde:bcixl\
l.........................{}................................{}......ixxxxlfgfgfgfgfgfgfgfgfgfgfixl\
l............................................{}.....................ixxxxlFGFGFGFGFGFGFGFGFGFGFixl\
l....................{}............{}..................{}...........ixxxxl          d123b123   ixl\
l................{}........{}.......................................ixxxxl       J   456 456   ixl\
l.......................................C...........................ixxxxl           789 789oo ixl\
l............{}............................................=========xxxxxl!o     ==============xxl\
l...............................dmmmmmmmmmmm==============xxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l.a....a....a....a....a....a....a....a....a.ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
le:bcde:bcde:bcde:bcde:bcde:bcde:bcde:bcde:bcxxxxxxxxxxxxxxxxxxxxxxxxxxxxl     o!ixxxxxxxxxxxxxxxl\
lfgfgfgfgfgfgfgfgfgfgfgfgfgfggfgffgfgfgfgfgfg                                    ixxxxxxxxxxxxxxxl\
lFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFGFG                                    ixxxxxxxxxxxxxxxl\
l                L__________________      o ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l  123 123 123  123 123                dmmmmxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
lP 456 456 456  456 456                     ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
l  789 789 789 v789 789        o     o      ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl     o!ixxxxxxxxxxxxxxxl\
============================================ixxxxxxxxxxxxxxxxxxxxxxxxxxxxl       ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxl!o     ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx_______________________________l       ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo 123                                ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo 456      J                         ixxxxxxxxxxxxxxxl\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlooo 789 v v   v  v  v v   v            ixxxxxxxxxxxxxxxl\
lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmb      ixxxxxxxxxxxxxxxl\
l                                                                              v ixxxxxxxxxxxxxxxl\
l                                                                            dmmmxxxxxxxxxxxxxxxxl\
l                                                                                               ix\
l                                                                mmmmm                          ix\
l                                                       ====k                                   ix\
l                                                       ixxxl              mmmm                 ix\
l                                                     mmixxxl                              123  ix\
l                                                       ixxxl                      mm  R   456ooix\
l                                             mm        ixxxl                     v        789ooix\
l       123                                             ixxxl                  =================ix\
l   J   456                 v                           ixxxl                  ixxxxxxxxxxxxxxxxxx\
lt      789       vv        ===       mm                ixxxl                  ixxxxxxxxxxxxxxxxxx\
l====================k      ixl                         ixxxl                  ixxxxxxxxxxxxxxxxxx\
lxxxxxxxxxxxxxxxxxxxxl      ixl                         ixxxl                  ixxxxxxxxxxxxxxxxxx\
lxxxxxxxxxxxxxxxxxxxxl!!!!!!ixl!!!!!!!!!!!!!!!!!!!!!!!!!ixxl!!!!!!!!!!!!!!!!!!!ixxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
});

mapArr.push({
  level: 9,
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
]                   J             [\
]            o                    [\
]IIIIIIIIIIIIIIIIIIIIIdmmmbIIIIIII[\
]   R                             [\
]                o              o [\
]IIIIIIIIII%%%%%%IIIIIIIIIIIIIIIII[\
]        R                        [\
]    o             o      o    t  [\
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIdmbII\
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\
===================================\
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  
 });
