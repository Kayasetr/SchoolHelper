/*
 easyChem. v0.7.29 2018-08-24 by PeterWin
*/
function Point(d, c) {
    if (d === undefined) {
        return this.x = this.y = 0
    }
    if (typeof d == "object" && ("x" in d) && ("y" in d)) {
        this.x = +d.x;
        this.y = +d.y
    } else {
        this.x = +d;
        if (isNaN(this.y = +c)) {
            this.y = this.x
        }
    }
    if (isNaN(this.x) || isNaN(this.y)) {
        this.x = this.y = 0
    }
}

function is0(a) {
    return Math.abs(a) < 0.001
}

function esc(a) {
    return a.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
Point.prototype = new function() {
    function b(d, c) {
        if (d instanceof Point) {
            return d
        }
        return new Point(d, c)
    }
    this.init = function(c, d) {
        this.x = c;
        this.y = d
    };
    this.equals = function(d, c) {
        var e = b(d, c);
        return is0(this.x - e.x) && is0(this.y - e.y)
    };
    this.addi = function(d, c) {
        var e = b(d, c);
        this.x += e.x;
        this.y += e.y;
        return this
    };
    this.addx = function(d, c) {
        var e = new Point(d, c);
        e.x += this.x;
        e.y += this.y;
        return e
    };
    this.subi = function(d, c) {
        var e = b(d, c);
        this.x -= e.x;
        this.y -= e.y;
        return this
    };
    this.subx = function(d, c) {
        var e = new Point(d, c);
        return e.negi().addi(this)
    };
    this.mini = function(d, c) {
        var e = b(d, c);
        this.x = Math.min(this.x, e.x);
        this.y = Math.min(this.y, e.y)
    };
    this.maxi = function(d, c) {
        var e = b(d, c);
        this.x = Math.max(this.x, e.x);
        this.y = Math.max(this.y, e.y)
    };
    this.negi = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this
    };
    this.negx = function() {
        return new Point(this).negi()
    };
    this.muli = function(c) {
        this.x *= c;
        this.y *= c;
        return this
    };
    this.mulx = function(c) {
        return this.clone().muli(c)
    };
    this.lengthSqr = function() {
        return this.x * this.x + this.y * this.y
    };
    this.length = function() {
        return Math.sqrt(this.lengthSqr())
    };
    this.distSqr = function(d, c) {
        return this.subx(b(d, c)).lengthSqr()
    };
    this.dist = function(d, c) {
        return Math.sqrt(this.distSqr(d, c))
    };
    this.fromRad = function(c) {
        this.x = Math.cos(c);
        this.y = Math.sin(c);
        return this
    };
    this.fromDeg = function(c) {
        return this.fromRad(Math.PI * c / 180)
    };
    this.transponi = function() {
        var c = this.x;
        this.x = this.y;
        this.y = c;
        return this
    };
    this.transponx = function() {
        return this.clone().transponi()
    };

    function a(c) {
        c = Math.round(c * 1000) / 1000;
        return c.toString()
    }
    this.toString = function() {
        return "{" + a(this.x) + ", " + a(this.y) + "}"
    };
    this.clone = function() {
        return new Point(this)
    };
    this.polarAngle = function() {
        if (this.x == 0 && this.y == 0) {
            return 0
        }
        if (this.x == 0) {
            return this.y > 0 ? Math.PI / 2 : Math.PI * 3 / 2
        }
        return Math.atan2(this.y, this.x)
    }
};

function ChemElem(c, b, a) {
    this.n = c;
    this.id = b;
    this.M = a
}

function ChemExpr() {
    this.entities = [];
    this.error = null
}

function ChemOp(a, b, c) {
    this.srcText = a;
    this.dstText = b;
    this.eq = !!c;
    this.commentPre = "";
    this.commentPost = ""
}

function ChemAgent() {
    this.k = 1;
    this.nodes = [];
    this.links = []
}

function ChemNode() {
    this.items = []
}

function ChemLink(a) {
    this.bLinear = false;
    this.bHoriz = false;
    this.text = a;
    this.N = 1;
    this.nodes = [null, null];
    this.color = null
}

function ChemNodeItem(a) {
    this.obj = a;
    this.n = 1;
    this.charge = null;
    this.M = null;
    this.color = null;
    this.atomColor = null
}

function ChemObjGroup(a) {
    this.beg = a;
    this.end = this.findEnd(a);
    this.items = []
}

function ChemObjCustom(a) {
    this.text = a
}

function ChemObjComm(a) {
    this.srcText = a;
    this.text = ChemSys.cvtComm(a)
}
var MenTbl = {},
    MenTblArray = [];
var MenTblCategoryBlock = {
        s_block: "H,Na,K,Rb,Cs,Fr",
        p_block: "B,Al,Ga,In,Tl,Nh",
        d_block: "Sc,Y,Hf,Rf",
        f_block: "La,Ac"
    },
    MenTblCategoryProps = {
        "Alkali-metals": "Li,Na,K,Rb,Cs,Fr",
        "Alkaline-earth-metals": "Be,Mg,Ca,Sr,Ba,Ra",
        Lanthanides: "La",
        Actinides: "Ac",
        "Transition-metals": "Sc,Y,Hf,Rf,Cn",
        "Post-transition-metals": "Al,Ga,In,Tl,Nh",
        Metalloids: "B,Si,Ge,Sb",
        "Other-nonmetals": "H,C,P,Se",
        Halogens: "F,Cl,Br,I,At,Ts",
        "Noble-gases": "He,Ne,Ar,Kr,Xe,Rn,Og"
    },
    MenTblSubGroup = {
        subgr_a: "H,Ga,In,Tl",
        subgr_b: "Sc,Y,La,Ac"
    };
var ChemSys = new function() {
        this.macros = {};
        var F, D, m, p = Math.PI / 6;
        var z = document.defaultView;
        if (!z) {
            z = {}
        }
        if (!z.getComputedStyle) {
            z.getComputedStyle = function(i, j) {
                return i.currentStyle
            }
        }
        this.ver = function() {
            return [0, 7, 29]
        };
        this.verStr = function() {
            return this.ver().join(".")
        };
        this.Clone = function(j) {
            if (typeof j != "object" || j === null) {
                return j
            }
            var i, L = j instanceof Array ? [] : {};
            for (i in j) {
                L[i] = this.Clone(j[i])
            }
            return L
        };

        function u(i, j) {
            this.msgId = i;
            this.params = j;
            this.getMessage = function() {
                return N(this.msgId, this.params)
            };
            this.message = this.getMessage()
        }

        function q(i) {
            return MenTbl[i]
        }
        this.findElem = q;
        var B = {};
        this.findCategory = function(T, U, S) {
            if (!B[T]) {
                var Q, P, O, R, V = B[T] = {},
                    L = {};
                for (O in T) {
                    Q = T[O].split(",");
                    for (P in Q) {
                        L[Q[P]] = O
                    }
                }
                for (O in MenTbl) {
                    P = MenTbl[O].id;
                    if (L[P]) {
                        R = L[P]
                    }
                    V[P] = R
                }
            }
            var W = B[T][U];
            if (S !== undefined) {
                if (!S || !(S in this.Dict)) {
                    S = this.curLang
                }
                if (!(S in this.Dict)) {
                    S = "en"
                }
                W = W.replace(/-/g, " ").replace(/_/g, "-");
                W = N(W)
            }
            return W
        };
        ChemElem.prototype = {
            walk: function(i) {
                if (i.atom) {
                    i.atom(this)
                }
            }
        };
        GroupBrackets = {
            "(": ")",
            "[": "]"
        };
        ChemObjGroup.prototype = {
            findEnd: function(i) {
                return GroupBrackets[i]
            },
            walk: function(L) {
                if (L.groupPre) {
                    L.groupPre(this)
                }
                for (var j in this.items) {
                    this.items[j].walk(L)
                }
                if (L.groupPost) {
                    L.groupPost(this)
                }
            }
        };
        ChemObjCustom.prototype = {
            walk: function(i) {
                if (i.custom) {
                    i.custom(this)
                }
            }
        };
        ChemObjComm.prototype = {
            walk: function(i) {
                if (i.comm) {
                    i.comm(this)
                }
            }
        };
        ChemNodeItem.prototype = {
            walk: function(i) {
                if (i.itemPre) {
                    i.itemPre(this)
                }
                this.obj.walk(i);
                if (i.itemPost) {
                    i.itemPost(this)
                }
            }
        };
        ChemNode.prototype = {
            walk: function(L) {
                var j, O = this.items;
                for (j in O) {
                    O[j].walk(L)
                }
            }
        };
        ChemLink.prototype = {};
        ChemOp.prototype = {
            isLinear: function() {
                return true
            },
            walk: function(i) {
                if (i.operation) {
                    i.operation(this)
                }
            }
        };
        ChemAgent.prototype = {
            isLinear: function() {
                for (var j in this.links) {
                    if (!this.links[j].bLinear) {
                        return false
                    }
                }
                return true
            },
            getKoeff: function() {
                return this.k
            },
            setKoeff: function(i) {
                this.k = i
            },
            walk: function(R) {
                if (R.agentPre) {
                    R.agentPre(this)
                }
                var P, T = this.nodes,
                    j = this.links,
                    S = R.nodePre,
                    O = R.nodePost,
                    Q = R.comment;
                if (Q && this.commentPre) {
                    R.comment(this.commentPre, 0)
                }
                for (P in T) {
                    if (S) {
                        R.nodePre(T[P])
                    }
                    T[P].walk(R);
                    if (O) {
                        R.nodePost(T[P])
                    }
                }
                if (R.link) {
                    for (P in j) {
                        R.link(j[P])
                    }
                }
                if (Q && this.commentPost) {
                    R.comment(this.commentPost, 1)
                }
                if (R.agentPost) {
                    R.agentPost(this)
                }
            }
        };
        ChemExpr.prototype = {
            isOk: function() {
                return !this.error
            },
            isLinear: function() {
                for (var j in this.entities) {
                    if (!this.entities[j].isLinear()) {
                        return false
                    }
                }
                return true
            },
            getMessage: function() {
                return this.error ? this.error.getMessage() : null
            },
            walk: function(O) {
                var L, Q = this.entities,
                    P = O.entityPre,
                    j = O.entityPost;
                for (L in Q) {
                    if (P) {
                        O.entityPre(Q[L])
                    }
                    Q[L].walk(O);
                    if (j) {
                        O.entityPost(Q[L])
                    }
                }
            },
            html: function() {
                var i = new ChemSys.HtmlTempl();
                this.walk(i);
                return i.res
            }
        };
        this.isAbstract = function(L) {
            function j(O) {
                if (typeof O != "number") {
                    throw 1
                }
            }
            try {
                L.walk({
                    agentPre: function(O) {
                        j(O.k)
                    },
                    itemPre: function(O) {
                        j(O.n)
                    }
                });
                return false
            } catch (i) {
                return true
            }
        };
        this.calcMass = function(O) {
            var L = 0,
                j = [0],
                i = [];
            O.walk({
                entityPre: function() {
                    j = [0]
                },
                atom: function(P) {
                    L = P.M
                },
                custom: function() {
                    L = 0
                },
                comm: function() {
                    L = 0
                },
                groupPre: function() {
                    j.unshift(0)
                },
                groupPost: function() {
                    L = j.shift()
                },
                itemPost: function(P) {
                    if (P.M) {
                        L = P.M
                    }
                    j[0] += L * P.n
                },
                agentPost: function(P) {
                    j[0] *= P.k
                },
                entityPost: function() {
                    i.push(ChemSys.massRound(j[0]))
                }
            });
            if (i.length == 0) {
                i[0] = ChemSys.massRound(j[0])
            }
            return i
        };
        this.makeBruttoKey = function(j) {
            if (typeof j == "string") {
                j = this.compile(j);
                if (!j.isOk() || this.isAbstract(j)) {
                    return false
                }
            }
            if (typeof j != "object" || !j.walk) {
                return false
            }
            var i = this.makeBrutto(j, "hill", 1).html();
            return i.replace(/\s/g, "").replace(/<[-\/a-z=\"]*>/g, "")
        };
        this.makeBrutto = function(O, L, j) {
            var i = new ChemExpr();
            O.walk({
                operation: function(P) {
                    i.entities.push(P)
                },
                agentPre: function(V) {
                    var R = new ChemAgent(),
                        T = new ChemNode(),
                        S;
                    i.entities.push(R);
                    R.nodes.push(T);
                    var Q, P = ChemSys.groupElements(V),
                        W;
                    for (Q in P) {
                        if (Q.charAt(0) == "{") {
                            if (!j) {
                                W = new ChemObjCustom(Q.substring(1, Q.length - 1))
                            } else {
                                continue
                            }
                        } else {
                            W = MenTbl[Q]
                        }
                        T.items.push(S = new ChemNodeItem(W));
                        S.n = P[Q]
                    }
                    var U = !!P.C;
                    if (L) {
                        T.items.sort(function(ab, aa) {
                            var Y = ab.obj,
                                X = aa.obj;
                            var ad = Y.id ? Y.id : "z" + Y.text;
                            var ac = X.id ? X.id : "z" + X.text;
                            if (L == "hill") {
                                if (ad == ac) {
                                    return 0
                                }
                                if (ad == "C") {
                                    return -1
                                }
                                if (ac == "C") {
                                    return 1
                                }
                                if (ad == "H") {
                                    return -1
                                }
                                if (ac == "H") {
                                    return 1
                                }
                                return ad < ac ? -1 : 1
                            } else {
                                if (L == "mass") {
                                    function Z(ah) {
                                        var ag = ah.M || ah.obj.M || 0
                                    }
                                    var af = Z(Y),
                                        ae = Z(X);
                                    if (af == ae) {
                                        return 0
                                    }
                                    return af < ae ? -1 : 1
                                } else {
                                    if (ad < ac) {
                                        return -1
                                    }
                                    if (ad > ac) {
                                        return 1
                                    }
                                    return 0
                                }
                            }
                        })
                    }
                }
            });
            return i
        };

        function f(Q, O, i) {
            var L, P;
            for (L in O) {
                P = O[L] * i;
                if (!Q[L]) {
                    Q[L] = P
                } else {
                    Q[L] += P
                }
            }
        }
        this.merge = f;
        this.groupElements = function(j) {
            var i = [{}];
            j.walk({
                itemPre: function(L) {
                    i.unshift({})
                },
                atom: function(L) {
                    i[0][L.id] = 1
                },
                custom: function(L) {
                    if (L.text) {
                        i[0]["{" + L.text + "}"] = 1
                    }
                },
                itemPost: function(L) {
                    f(i[1], i[0], L.n);
                    i.shift()
                }
            });
            return i[0]
        };
        this.sortGroup = function(j, P) {
            var O, L = [];
            for (O in j) {
                L.push({
                    id: O,
                    n: j[O]
                })
            }
            L.sort(function(R, Q) {
                var i = MenTbl[R.id],
                    S = MenTbl[Q.id];
                if (i.n < S.n) {
                    return -1
                }
                if (i.n > S.n) {
                    return 1
                }
                return 0
            });
            return L
        };
        this.rulesBB = {
            AgentK: "[b]*[/b]",
            ItemCnt: "[sub]*[/sub]",
            ItemMass: "[sup]*[/sup]",
            ItemCharge: "[sup]*[/sup]",
            ColorPre: "[color=*]",
            ColorPost: "[/color]",
            NodeCharge: "[sup]*[/sup]",
            Custom: "[i]*[/i]",
            Comment: "[color=blue]*[/color]"
        };
        this.rulesHtml = {
            Atom: "",
            AgentK: "<b>*</b>",
            ItemMass: "<sup>*</sup>",
            ItemCnt: "<sub>*</sub>",
            ItemCharge: '<sup class="echem-item-charge">*</sup>',
            ColorPre: '<span style="color:*">',
            ColorPost: "</span>",
            NodeCharge: "<sup>*</sup>",
            Custom: "<i>*</i>",
            Comment: "<em>*</em>",
            OpComment: '<span class="echem-opcomment">*</span>',
            Operation: '<span class="echem-op">*</span>'
        };

        function r(L, i, j) {
            if (L[i]) {
                return L[i].replace("*", j)
            }
            return j
        }
        this.makeHtml = function(P, O, i) {
            var L = new this.HtmlTempl(O);
            if (i) {
                for (var j in i) {
                    if (L[j]) {
                        L["$" + j] = L[j]
                    }
                    L[j] = i[j]
                }
            }
            P.walk(L);
            return L.res
        };
        this.HtmlTempl = function(j) {
            var i, L;
            j = j || ChemSys.rulesHtml;
            this.res = "";
            this.entityPre = function(O) {
                if (this.res) {
                    this.res += " "
                }
            };
            this.operation = function(P) {
                var O = P.dstText;
                if (P.commentPre) {
                    O = r(j, "OpComment", P.commentPre) + O
                }
                if (P.commentPost) {
                    O += r(j, "OpComment", P.commentPost)
                }
                this.res += r(j, "Operation", O)
            };
            this.agentPre = function(O) {
                i = O;
                L = 0;
                if (O.k != 1) {
                    this.res += r(j, "AgentK", O.k)
                }
            };
            this.drawCharge = function(O, P) {
                if (O.charge && O.charge.left == P) {
                    this.res += r(j, "NodeCharge", O.charge.text)
                }
            };
            this.nodePre = function(O) {
                this.drawCharge(O, 1)
            };
            this.nodePost = function(O) {
                if (L < i.links.length) {
                    this.res += i.links[L].text
                }
                L++;
                this.drawCharge(O, 0)
            };
            this.itemPre = function(O) {
                if (O.color) {
                    this.res += r(j, "ColorPre", O.color)
                }
                if (O.M) {
                    this.res += r(j, "ItemMass", O.M)
                }
                this.lastItem = O
            };
            this.itemPost = function(O) {
                if (O.charge) {
                    this.res += r(j, "ItemCharge", O.charge.text)
                }
                if (O.n != 1) {
                    this.res += r(j, "ItemCnt", O.n)
                }
                if (O.color) {
                    this.res += r(j, "ColorPost", O.color)
                }
            };
            this.atom = function(P) {
                var O = this.lastItem.atomColor;
                if (O) {
                    this.res += r(j, "ColorPre", O)
                }
                this.res += r(j, "Atom", P.id);
                if (O) {
                    this.res += r(j, "ColorPost", O)
                }
            };
            this.groupPre = function(O) {
                this.res += O.beg
            };
            this.groupPost = function(O) {
                this.res += O.end
            };
            this.comm = function(O) {
                this.res += r(j, "Comment", O.text)
            };
            this.custom = function(O) {
                this.res += r(j, "Custom", O.text)
            };
            this.result = function() {
                return this.res
            }
        };
        this.isEmptyNode = function(L) {
            var j = 1;

            function i(O) {
                if (O.text) {
                    j = 0
                }
            }
            L.walk({
                comm: i,
                custom: i,
                atom: function() {
                    j = 0
                }
            });
            return !!j
        };
        this.demoVisitor = function(i) {
            i.walk({
                entityPre: function(j) {},
                entityPost: function(j) {},
                operation: function(j) {},
                agentPre: function(j) {},
                agentPost: function(j) {},
                nodePre: function(j) {},
                nodePost: function(j) {},
                link: function(j) {},
                itemPre: function(j) {},
                itemPost: function(j) {},
                atom: function(j) {},
                groupPre: function(j) {},
                groupPost: function(j) {},
                custom: function(j) {}
            })
        };
        var H = ["H,1.008", "He,4.003", "Li,6.941", "Be,9.0122", "B,10.811", "C,12.011", "N,14.007", "O,15.999", "F,18.998", "Ne,20.179", "Na,22.99", "Mg,24.312", "Al,26.092", "Si,28.086", "P,30.974", "S,32.064", "Cl,35.453", "Ar,39.948", "K,39.102", "Ca,40.08", "Sc,44.956", "Ti,47.956", "V,50.941", "Cr,51.996", "Mn,54.938", "Fe,55.849", "Co,58.933", "Ni,58.7", "Cu,63.546", "Zn,65.37", "Ga,69.72", "Ge,72.59", "As,74.922", "Se,78.96", "Br,79.904", "Kr,83.8", "Rb,85.468", "Sr,87.62", "Y,88.906", "Zr,91.22", "Nb,92.906", "Mo,95.94", "Tc,99", "Ru,101.07", "Rh,102.906", "Pd,106.4", "Ag,107.868", "Cd,112.41", "In,114.82", "Sn,118.69", "Sb,121.75", "Te,127.6", "I,126.905", "Xe,131.3", "Cs,132.905", "Ba,137.34", "La,138.906", "Ce,140.115", "Pr,140.908", "Nd,144.24", "Pm,145", "Sm,150.4", "Eu,151.96", "Gd,157.25", "Tb,158.926", "Dy,162.5", "Ho,164.93", "Er,167.26", "Tm,168.934", "Yb,173.04", "Lu,174.97", "Hf,178.49", "Ta,180.948", "W,183.85", "Re,186.207", "Os,190.2", "Ir,192.22", "Pt,195.09", "Au,196.967", "Hg,200.59", "Tl,204.37", "Pb,207.19", "Bi,208.98", "Po,210", "At,210", "Rn,222", "Fr,223", "Ra,226", "Ac,227", "Th,232.038", "Pa,231", "U,238.29", "Np,237", "Pu,244", "Am,243", "Cm,247", "Bk,247", "Cf,251", "Es,254", "Fm,257", "Md,258", "No,259", "Lr,260", "Rf,261", "Db,262", "Sg,271", "Bh,267", "Hs,269", "Mt,276", "Ds,281", "Rg,280", "Cn,285", "Nh,286", "Fl,289", "Mc,289", "Lv,293", "Ts,294", "Og,294"];
        this.massRound = function(i) {
            if (!i) {
                return i
            }
            return Math.floor(i * 1000) / 1000
        };
        var n = [{
            op: "+"
        }, {
            op: "-->",
            eq: 1,
            dst: "—→"
        }, {
            op: "->",
            eq: 1,
            dst: "→"
        }, {
            op: "®",
            eq: 1,
            dst: "→"
        }, {
            op: "→",
            eq: 1
        }, {
            op: "=",
            eq: 1
        }, {
            op: "↔",
            eq: 1
        }, {
            op: "<->",
            eq: 1,
            dst: "↔"
        }, {
            op: "<=>",
            eq: 1,
            dst: "\u21CC"
        }, {
            op: "*",
            dst: "∙"
        }, {
            op: "!=",
            dst: "≠"
        }];
        for (F = 0; F < H.length; F++) {
            m = H[F].split(",");
            MenTblArray.push(MenTbl[m[0]] = new ChemElem(+F + 1, m[0], +m[1]))
        }

        function o(i) {
            if (i === undefined) {
                return null
            }
            return i.length == 0 ? null : i[i.length - 1]
        }
        var e = [
            [/\|\^|ArrowUp/g, "↑"],
            [/(\|v)|(ArrowDown)/g, "↓"],
            [/\^o/g, "°"]
        ];
        var K = {
            alpha: "α",
            Alpha: "Α",
            beta: "β",
            Beta: "Β",
            gamma: "γ",
            Gamma: "Γ",
            delta: "δ",
            Delta: "Δ",
            epsilon: "ε",
            Epsilon: "Ε",
            zeta: "ζ",
            Zeta: "Ζ",
            eta: "η",
            Eta: "Η",
            theta: "θ",
            Theta: "Θ",
            iota: "ι",
            Iota: "Ι",
            kappa: "κ",
            Kappa: "Κ",
            lambda: "λ",
            Lambda: "Λ",
            mu: "μ",
            Mu: "Μ",
            nu: "ν",
            Nu: "Ν",
            xi: "ξ",
            Xi: "Ξ",
            omicron: "ο",
            Omicron: "Ο",
            pi: "π",
            Pi: "Π",
            rho: "ρ",
            Rho: "Ρ",
            sigma: "σ",
            Sigma: "Σ",
            tau: "τ",
            Tau: "Τ",
            upsilon: "υ",
            Upsilon: "Υ",
            phi: "φ",
            Phi: "Φ",
            chi: "χ",
            Chi: "Χ",
            psi: "ψ",
            Psi: "Ψ",
            omega: "ω",
            Omega: "Ω"
        };

        function l(j) {
            var Q, T, P = j,
                S, O, R, L;
            for (Q in e) {
                T = e[Q];
                P = P.replace(T[0], T[1])
            }
            Q = 0;
            while (Q < P.length) {
                S = P.indexOf("[", Q);
                if (S < 0) {
                    break
                }
                O = P.indexOf("]", S);
                if (O < 0) {
                    break
                }
                R = P.substring(S + 1, O);
                L = K[R];
                if (L) {
                    P = P.substr(0, S) + L + P.substr(O + 1)
                } else {
                    Q = S + 1
                }
            }
            return v(P)
        }
        this.cvtComm = l;

        function v(i) {
            F = i.indexOf("`");
            while (F >= 0) {
                k = i.indexOf("`", F + 1);
                if (k < 0) {
                    break
                }
                s = i.substring(F + 1, k);
                t = N(s);
                if (t == s) {
                    i = i.substring(0, F) + i.substring(F + 1)
                } else {
                    i = i.substring(0, F) + t + i.substring(k + 1)
                }
                F = i.indexOf("`")
            }
            i = i.replace("`", "");
            return i
        }
        this.translate = v;
        var b = {
            i: 1,
            ii: 2,
            iii: 3,
            iv: 4,
            v: 5,
            vi: 6,
            vii: 7,
            viii: 8
        };

        function d(L) {
            var i, j, P = 0;

            function O(Q) {
                return {
                    val: Q,
                    text: L,
                    left: 0
                }
            }
            L = L.replace(/–/g, "-");
            if (L) {
                if (/^-+$/.test(L)) {
                    return O(-L.length)
                }
                if (/^\++$/.test(L)) {
                    return O(L.length)
                }
                if (/(^|(^[-+]))\d+$/.test(L)) {
                    return O(+L)
                }
                if (/^\d+[-+]$/.test(L)) {
                    i = L.length - 1;
                    j = +(L.substring(0, i));
                    if (L.charAt(i) == "-") {
                        j = -j
                    }
                    return O(j)
                }
                j = b[L];
                if (j) {
                    L = L.toUpperCase();
                    return O(j)
                }
            }
            return null
        }
        var c = {
            "$32": Math.sqrt(3) / 2,
            "$3": Math.sqrt(3),
            "$3x2": Math.sqrt(3) * 2,
            "$2": Math.sqrt(2),
            "$22": Math.sqrt(2) / 2,
            "$2x2": Math.sqrt(2) * 2,
            "½": 0.5,
            "¼": 1 / 4,
            "¾": 3 / 4,
            "⅓": 1 / 3,
            "⅔": 2 / 3
        };
        var C = {};

        function E(i) {
            if (!i) {
                return 0
            }
            var L = 1;
            if (i.charAt(0) == "-") {
                L = -1;
                i = i.substring(1)
            }
            if (i.charAt(0) == "%") {
                var Q, P = i.indexOf(":"),
                    O;
                if (P >= 0) {
                    O = i.substring(1, P);
                    Q = i.substring(P + 1);
                    C[O] = Q
                } else {
                    O = i.substring(1);
                    Q = C[O];
                    if (!Q) {
                        throw new Error("Undefined const " + O)
                    }
                }
                i = Q
            }
            if (i in c) {
                return L * c[i]
            }
            return +i * L
        }
        var a = {
            "≡": "%",
            "–": "-"
        };
        var x = {
                "-": {
                    N: 1,
                    A: 0,
                    slope: 0
                },
                "=": {
                    N: 2,
                    A: 0,
                    slope: 0
                },
                "%": {
                    N: 3,
                    A: 0,
                    slope: 0,
                    text: "≡"
                },
                "|": {
                    N: 1,
                    A: Math.PI / 2,
                    slope: 0
                },
                "||": {
                    N: 2,
                    A: Math.PI / 2,
                    slope: 0
                },
                "|||": {
                    N: 3,
                    A: Math.PI / 2,
                    slope: 0
                },
                "/": {
                    N: 1,
                    A: 0,
                    slope: -1
                },
                "//": {
                    N: 2,
                    A: 0,
                    slope: -1
                },
                "///": {
                    N: 3,
                    A: 0,
                    slope: -1
                },
                "\\": {
                    N: 1,
                    A: 0,
                    slope: 1
                },
                "\\\\": {
                    N: 2,
                    A: 0,
                    slope: 1
                },
                "\\\\\\": {
                    N: 3,
                    A: 0,
                    slope: 1
                }
            },
            y = {};
        for (F in x) {
            y[F.charAt(0)] = 1
        }
        for (F in a) {
            y[F.charAt(0)] = 1
        }

        function w(i) {
            return x[a[i] || i]
        }
        this.compile = function(ai) {
            ai = ai.replace(/−/g, "-") + " ";
            ai = ai.replace(/\(\*/g, "<").replace(/\*\)/g, ">");
            var a0, aS = 0,
                aT = "",
                aO, af = new ChemExpr(),
                aW, aA = af.entities,
                aj, aB = "begin",
                aq = [],
                ag = 0,
                R = null,
                aU, aE, ax, aa, X = [],
                ar = [],
                aV, az = 0,
                ac = {};

            function ap(a5, i) {
                i = i || {};
                if ("pos" in i) {
                    a5 += " in position [pos]";
                    i.pos = i.pos || aS + 1
                }
                throw new u(a5, i)
            }
            var aJ, a2 = null,
                W = null,
                O = null,
                aY = 0,
                aF = null,
                L = 0,
                aI = 1,
                a4 = 0,
                ab = 0,
                P = 0;
            funcs = {
                M: function(i) {
                    a2 = +i
                },
                L: function(i) {
                    aI = E(i) || 1
                },
                color: function(i) {
                    if (i == "") {
                        i = null
                    }
                    W = i
                },
                ver: function(a5) {
                    var a6 = a5.split("."),
                        i = ChemSys.ver();
                    if (a6.length > 1) {
                        if (a6[0] > i[0] || (a6[0] == i[0] && a6[1] > i[1])) {
                            ap("Invalid version", {
                                cur: ChemSys.verStr(),
                                need: a6.join(".")
                            })
                        }
                    }
                },
                dots: function(be) {
                    var ba, bc, a9 = "",
                        a5, bd = 0,
                        a7 = 0;
                    var a8 = {
                            U: "T",
                            D: "B",
                            u: "t",
                            d: "b"
                        },
                        a6 = {
                            L: 68,
                            R: 136,
                            T: 3,
                            B: 48
                        },
                        bb = {
                            Lt: 64,
                            Lb: 4,
                            Rt: 128,
                            Rb: 8,
                            Tl: 2,
                            Tr: 1,
                            Bl: 32,
                            Br: 16
                        };
                    for (ba = 0; ba < be.length; ba++) {
                        bc = be.charAt(ba);
                        if (bc in a8) {
                            bc = a8[bc]
                        }
                        a5 = a9 + bc;
                        if (bc in a6) {
                            a7 |= a6[bc];
                            a9 = bc
                        } else {
                            if (a5 in bb) {
                                a7 &= ~bb[a5];
                                a9 = ""
                            } else {
                                if (bc == "!") {
                                    bd = 255
                                }
                            }
                        }
                    }
                    P = a7 ^ bd
                },
                dashes: function(a6) {
                    var a8, ba, a7 = 0,
                        a5 = 0,
                        a9 = 0;
                    ab = 0;
                    for (a8 = 0; a8 < a6.length; a8++) {
                        ba = a6.charAt(a8);
                        switch (ba) {
                            case ".":
                                a7++;
                                a5++;
                                a9++;
                                break;
                            case "-":
                                ab |= 1;
                                a7++;
                                a5++;
                                a9++;
                                break;
                            case "_":
                                ab |= 2;
                                a7++;
                                a5++;
                                a9++;
                                break;
                            case "|":
                                ab |= a5 ? 8 : 4;
                                a5++;
                                break;
                            case "/":
                                ab |= a7 ? 128 : 16;
                                a7++;
                                break;
                            case "\\":
                                ab |= a9 ? 32 : 64;
                                a9++;
                                break;
                            case "<":
                                ab |= 80;
                                a7++;
                                a9++;
                                break;
                            case ">":
                                ab |= 160;
                                break
                        }
                    }
                },
                itemColor: function(i) {
                    if (i == "") {
                        i = null
                    }
                    O = i;
                    aY = 0
                },
                itemColor1: function(i) {
                    O = i;
                    aY = 1
                },
                atomColor: function(i) {
                    aF = i;
                    L = 0
                },
                atomColor1: function(i) {
                    aF = i;
                    L = 1
                },
                slope: function(i) {
                    i = +i;
                    R = isNaN(i) ? null : i * Math.PI / 180
                }
            };

            function aP(i, a5) {
                aB = i;
                aW = "";
                return a5 || 0
            }

            function ay() {
                aW += a0;
                return 1
            }

            function ah() {
                if (aV) {
                    ap("Link required")
                }
            }

            function a3() {
                aU = null;
                aa = null;
                ax = X.length;
                X.push({
                    sc: 0,
                    L: []
                })
            }

            function ae() {
                var a6 = ar.pop();
                if (a6) {
                    ap("Не закрыта ветка", {
                        pos: a6.pos
                    })
                }
                var i = X[ax];
                var a5 = o(i.L);
                if (!a5) {
                    return
                }
                if (!a5.nodes[1]) {
                    a5.nodes[1] = a1(1)
                }
            }

            function a1(a5) {
                ah();
                aU = new ChemNode();
                var a7 = X[ax];
                aq = [aU.items];
                aU.pt = new Point();
                aU.ch = ax;
                aU.sc = a7.sc;
                var a9 = aa,
                    i = a9 ? a9.nodes[0] : null;
                if (a5) {
                    aU.bAuto = 1;
                    if (a9 && a9.bHoriz) {
                        aU.sc = --a7.sc;
                        a9.bHoriz = 0
                    }
                }
                if (a9) {
                    aU.pt = a9.nodes[0].pt.addx(aE);
                    a9.nodes[1] = aU;
                    if (!a9.bHoriz) {
                        aU.sc = i.sc
                    }
                    var a8, a6 = a7.L.length;
                    while (a6 > 0) {
                        a8 = a7.L[--a6].nodes[0];
                        if (a8.sc != aU.sc) {
                            break
                        }
                        if (a8.pt.equals(aU.pt)) {
                            aD(a8);
                            return aU = a8
                        }
                    }
                }
                aU.i = aj.nodes.length;
                aj.nodes.push(aU);
                if (aj.commentPre) {
                    aX(new ChemObjComm(aj.commentPre));
                    aj.commentPre = null
                }
                return aU
            }

            function T(ba) {
                var a8, bc = +ba,
                    a5 = aj.nodes;
                if (bc) {
                    if (bc < 0) {
                        bc += a5.length;
                        if (bc < 0) {
                            return null
                        }
                        return a5[bc]
                    }
                    if (bc > a5.length) {
                        return null
                    }
                    return a5[--bc]
                }
                var a6, bb, a7 = ba,
                    a9;
                if (a9 = q(a7)) {
                    a6 = aj.nodes;
                    bc = a6.length;
                    for (a8 = 0; a8 < bc; a8++) {
                        bb = a6[a8];
                        if (bb.items.length == 1 && bb.items[0].obj == a9) {
                            return bb
                        }
                    }
                }
                bb = ac[ba];
                if (bb) {
                    return bb
                }
                return null
            }

            function Y(a5) {
                var i = T(a5);
                if (!i) {
                    ap("Invalid node reference '[ref]'", {
                        ref: a5
                    })
                }
                return i
            }

            function aD(a7) {
                ah();
                var a5 = X[ax];
                var a6 = o(a5.L);
                if (!a6) {
                    ax = a7.ch;
                    X.length--
                } else {
                    var i = a6.nodes[0];
                    a6.nodes[1] = a7;
                    if (i.ch != a7.ch) {
                        S(a7, i)
                    }
                }
                aU = a7
            }

            function S(a8, a6) {
                var a5 = X[ax];
                var a9 = X[a8.ch];
                var bf = a8.pt.subx(a6.pt.addx(aE));
                var bd, bc = a5.L,
                    ba, bb = bc.length,
                    a7, be = a8.sc;
                for (ba in aj.nodes) {
                    a7 = aj.nodes[ba];
                    a7.ufl = a7.ch != a6.ch
                }
                while (bb > 0) {
                    bd = bc[--bb];
                    for (ba in bd.nodes) {
                        a7 = bd.nodes[ba];
                        if (a7.ufl) {
                            continue
                        }
                        a7.ufl = 1;
                        a7.ch = a8.ch;
                        a7.pt.addi(bf);
                        a7.sc = a8.sc
                    }
                }
                for (bb in bc) {
                    bc[bb].nodes[0].ufl = 0;
                    a9.L.push(bc[bb])
                }
                X[ax] = null;
                ax = a8.ch
            }

            function al() {
                var a6 = X[ax],
                    a5 = aU,
                    i = aa;
                if (!a5 && !i) {
                    ap("Перед началом ветки необходимо определить узел или связь")
                }
                if (i && !i.nodes[1]) {
                    a1(1)
                }
                ar.push({
                    node: a5,
                    link: i,
                    pos: aS
                });
                aV++
            }

            function aH() {
                var a5 = ar.pop();
                if (!a5) {
                    ap("Лишний символ конца ветки")
                }
                var i = o(X[ax].L);
                if (i && !i.nodes[1]) {
                    a1(1)
                }
                aU = a5.node;
                aa = a5.link;
                if (!aU) {
                    aU = aa.nodes[1]
                }
                aV++
            }
            var Q = null,
                aQ = new Point();

            function an(a6, a7) {
                aV = 0;
                aQ = new Point();
                var a5 = new ChemLink(a7.text);
                a5.N = a7.N;
                a5.slope = a7.slope || 0;
                a5.midPts = Q;
                Q = null;
                a5.w0 = a7.w0;
                a5.w1 = a7.w1;
                if (a7.arr0) {
                    a5.arr0 = a7.arr0
                }
                if (a7.arr1) {
                    a5.arr1 = a7.arr1
                }
                if (a7.cross) {
                    a5.cross = 1
                }
                if (a7.style) {
                    a5.style = a7.style
                }
                if (!a7.horiz) {
                    a5.bHoriz = is0(a6.y) && aU && !aU.bAuto
                } else {
                    a5.bHoriz = a7.horiz > 0
                }
                a5._horiz = is0(a6.y);
                a5.bLinear = a5.bHoriz && a6.x > 0;
                if (W) {
                    a5.color = W
                }
                a5.nodes[0] = aU;
                var i = X[ax];
                if (!a5.nodes[0]) {
                    a5.nodes[0] = a1(1)
                }
                aE = a6;
                aU = null;
                aj.links.push(a5);
                i.L.push(a5);
                if (a5.bHoriz) {
                    i.sc++
                }
                ag = 0;
                aa = a5;
                return a5
            }

            function aK() {
                X = [];
                ar = [];
                aV = 0;
                ac = {};
                a3();
                a4 = 0;
                aj.part = az
            }

            function ad() {
                if (aq.length != 1) {
                    ap("Expected '[C]'", {
                        C: o(aq[1]).end
                    })
                }
                ae();
                var a6, a8, a7, ba, a9, be = aj.links,
                    a5 = aj.nodes,
                    bb = a5.length;

                function i(bf, bg) {
                    if (!bf.bAuto) {
                        return
                    }
                    bf.val = bf.val || 0;
                    bf.val += bg
                }
                for (a8 in be) {
                    ba = be[a8];
                    for (a6 in ba.nodes) {
                        i(ba.nodes[a6], ba.N)
                    }
                }
                for (a8 in a5) {
                    a7 = a5[a8];
                    if (!a7.bAuto) {
                        continue
                    }
                    a7.items.push(new ChemNodeItem(MenTbl.C));
                    a6 = 4 - a7.val;
                    if (a6 > 0) {
                        a7.items.push(a9 = new ChemNodeItem(MenTbl.H));
                        a9.n = a6
                    }
                }
                var bd = {},
                    bc;
                a8 = 0;
                while (a8 < be.length) {
                    ba = be[a8];
                    bc = [];
                    for (a6 in ba.nodes) {
                        bc.push(ba.nodes[a6].i)
                    }
                    bc.sort();
                    bc = bc.join(";");
                    if (!bd[bc]) {
                        bd[bc] = ba;
                        a8++
                    } else {
                        bd[bc].N += ba.N;
                        be.splice(a8, 1)
                    }
                }
            }

            function aM() {
                if (a0 >= "A" && a0 <= "Z") {
                    aP("agentElem");
                    return ay()
                }
                if (a0 in y) {
                    return aP("shortLink")
                }
                switch (a0) {
                    case "#":
                        return aP("nodeRef", 1);
                    case "{":
                        return aP("itemCustom", 1);
                    case "<":
                        al();
                        return aP("agentMid", 1);
                    case ">":
                        aH();
                        return aP("agentMid", 1);
                    case "(":
                    case "[":
                        var a6 = new ChemObjGroup(a0);
                        aX(a6);
                        aq.unshift(a6.items);
                        return aP("agentIn", 1);
                    case ")":
                    case "]":
                        if (aq.length <= 1) {
                            ap("Unexpected '[C]'", {
                                C: a0
                            })
                        }
                        aq.shift();
                        var a5 = o(aq[0]),
                            i = a5 ? a5.obj.end : a5;
                        if (i != a0) {
                            ap("Expected '[ok]' instead of '[bad]'", {
                                ok: i,
                                bad: a0
                            })
                        }
                        return aP("itemFinal", 1);
                    case '"':
                        return aP("comm", 1);
                    case "^":
                        return aP("charge", 1);
                    case "`":
                        return aP("negChar", 1);
                    case "_":
                        return aP("fullLink", 1);
                    case ";":
                        ae();
                        a3();
                        return aP("agentSpace", 1);
                    case "$":
                    case "ƒ":
                        return aP("funcName", 1);
                    case ":":
                        return aP("label", 1);
                    case "c":
                        a1(1);
                        return 1
                }
                return -1
            }
            var aL = 0;

            function aw(i) {
                af.entities.push(aj = i);
                if (aL) {
                    aj.commentPre = aL;
                    aL = 0
                }
            }

            function aX(a5) {
                if (!aU) {
                    a1()
                }
                var i = new ChemNodeItem(a5);
                aq[0].push(i);
                i.color = W;
                if (O) {
                    i.color = O;
                    if (aY) {
                        O = null
                    }
                }
                i.atomColor = aF;
                if (L) {
                    aF = null
                }
                if (ab) {
                    i.dashes = ab;
                    ab = 0
                }
                if (P) {
                    i.dots = P;
                    P = 0
                }
                if (ag) {
                    i.bCenter = 1
                }
                ag = 0
            }

            function aG() {
                return o(aq[0])
            }

            function au() {
                var a5 = n.length - 1;
                while (a5 >= 0 && ai.indexOf(n[a5].op, aS) != aS) {
                    a5--
                }
                if (a5 < 0) {
                    return null
                }
                var a6 = ai.charAt(aS + n[a5].op.length);
                if (!(/[\s\"]/.test(a6))) {
                    return null
                }
                var i = n[a5];
                aw(new ChemOp(i.op, i.dst || i.op, i.eq));
                if (aj.commentPre) {
                    aj.commentPre = l(aj.commentPre)
                }
                if (i.eq) {
                    az++
                }
                aS += i.op.length;
                if (ai[aS] == '"') {
                    return aP("comm", 1)
                }
                return aP("begin")
            }

            function ao(a6) {
                var a5 = a6.slope,
                    i = a6.bNeg;
                if (!a5) {
                    if (a6._horiz) {
                        return i ? 9 : 3
                    } else {
                        return i ? 12 : 6
                    }
                }
                if (a5 > 0) {
                    if (a6.bCorr) {
                        return i ? 11 : 5
                    } else {
                        return i ? 10 : 4
                    }
                }
                if (a6.bCorr) {
                    return i ? 7 : 1
                }
                return i ? 8 : 2
            }

            function V(bi, a7) {
                var bl = w(bi),
                    bq, bf = {
                        text: bl.text || bi,
                        N: bl.N,
                        slope: bl.slope,
                        horiz: 0
                    };
                if (a7) {
                    for (bq = 0; bq < a7.length; bq++) {
                        switch (a7.charAt(bq)) {
                            case "0":
                                bf.N = 0;
                                break;
                            case "v":
                                bf.arr1 = 1;
                                bf.N = 0;
                                bf.style = "|";
                                break;
                            case "w":
                                bf.w1 = 1;
                                break;
                            case "d":
                                bf.w1 = -1;
                                break;
                            case "h":
                                bf.N = 0;
                                bf.style = ":";
                                break;
                            case "~":
                                bf.style = "~";
                                break;
                            case "x":
                                bf.cross = 1;
                                break
                        }
                    }
                }
                var bh = R || p;
                var br = bl.A + bl.slope * bh;
                var bd = aa;
                var a8 = 0;
                if (!R && bd && bd.bAuto) {
                    var bo = ao(bd),
                        bn;
                    var a6 = bd.slope,
                        a5 = bl.slope;
                    if (a5 < 0) {
                        bn = ag ? 8 : 2
                    } else {
                        if (a5 > 0) {
                            bn = ag ? 10 : 4
                        }
                    }
                    if (bl.slope && bd._horiz) {
                        a8 = 1
                    } else {
                        if (((bo == 8 || bo == 7) && bn == 4) || ((bo == 4 || bo == 5) && bn == 8) || ((bo == 10 || bo == 11) && bn == 2) || ((bo == 1 || bo == 2) && bn == 10)) {
                            a8 = 2
                        }
                    }
                    if (a8) {
                        br = bl.A + bl.slope * Math.PI / 3
                    }
                }
                var bu = ag;
                if (ag) {
                    br += Math.PI
                }
                var a9 = new Point().fromRad(br).muli(aI);
                var ba = an(a9, bf);
                ba.bNeg = bu;
                ba.bAuto = 1;
                if (!R && bd && bd.bAuto && ba.bAuto && !bd.bCorr) {
                    if (((bo == 4 || bo == 5) && bn == 8) || ((bo == 2 || bo == 1) && bn == 10) || ((bo == 10 || bo == 11) && bn == 2) || ((bo == 8 || bo == 7) && bn == 4) || ((bo == 10 || bo == 8 || bo == 2 || bo == 4) && ba._horiz)) {
                        var bb = ba.nodes[0];
                        var bt = bd.nodes[0].pt;
                        var bs = bb.pt.subx(bt);
                        var bk = bs.x < 0 ? -1 : 1,
                            bj = bs.y < 0 ? -1 : 1;
                        var bv = new Point(Math.abs(bs.y) * bk, Math.abs(bs.x) * bj);
                        var bc = bv.addi(bt);
                        var be = bc.subx(bb.pt);
                        bd.bCorr = 100;
                        if (!bb.bFix) {
                            bb.pt = bc;
                            var bg = X[ax].L;
                            var bp = bg.length - 2;
                            while (bg[bp] != bd && bp >= 0) {
                                bg[--bp].nodes[1].ufl = 0
                            }
                            if (bp < bg.length - 2) {
                                while (bp < bg.length - 2) {
                                    var bm = bg[++bp].nodes[1];
                                    if (!bm.ufl) {
                                        bm.ufl = 1;
                                        bm.pt.addi(be)
                                    }
                                }
                            }
                        } else {}
                    }
                }
                ba.bCorr = a8
            }

            function ak(a8) {
                var a7, a6, ba, a9 = {},
                    a5 = a8.split(",");
                for (a7 in a5) {
                    ba = a5[a7];
                    if (ba) {
                        a6 = ba.charAt(0);
                        ba = ba.substring(1);
                        if (!ba) {
                            ba = true
                        }
                        a9[a6] = ba
                    }
                }
                return a9
            }

            function U(a7, a9, bb) {
                if (!aa) {
                    return new Point(aI, 0)
                }
                if (!aa.nodes[1]) {
                    a1(1)
                }
                var ba = aa.nodes[1].pt;
                if (!bb) {
                    bb = aa.nodes[0].pt
                }
                var a5 = ba.dist(bb);
                var a6 = Math.PI * 2 / a9;
                var a8 = ba.subx(bb).polarAngle();
                var i = a8 + a7 * a6;
                return new Point().fromRad(i).muli(a5)
            }

            function av(i, a6, a5) {
                an(U(i, a6, 0), {
                    text: "",
                    N: a5,
                    horiz: -1
                })
            }

            function aN(bb) {
                var a5 = new Point();
                var bd = null,
                    ba = null;
                if ("A" in bb) {
                    bd = E(bb.A)
                } else {
                    if ("a" in bb) {
                        bd = 0;
                        if (aa) {
                            if (!aa.nodes[1]) {
                                a1(1)
                            }
                            var bc = aa.nodes[1].pt.subx(aa.nodes[0].pt);
                            bd = bc.polarAngle() * 180 / Math.PI
                        }
                        bd += E(bb.a)
                    }
                }
                if ("L" in bb) {
                    ba = E(bb.L)
                }
                if (bd !== null || ba !== null) {
                    if (bd === null) {
                        bd = 0
                    }
                    if (ba === null) {
                        ba = aI
                    }
                    a5.fromDeg(bd).muli(ba)
                }

                function i(bm, bj) {
                    if (!bm) {
                        return 0
                    }
                    if (bm.charAt(0) == "#") {
                        var bl = bm.substring(1).split(";"),
                            bi = 0,
                            bh, bk;
                        for (bh in bl) {
                            bk = Y(bl[bh]);
                            bi += bk.pt[bj]
                        }
                        bi /= bl.length;
                        if (!aU) {
                            a1(1)
                        }
                        return bi - aU.pt[bj]
                    }
                    return E(bm)
                }
                if ("x" in bb || "y" in bb) {
                    a5.x = i(bb.x, "x");
                    a5.y = i(bb.y, "y")
                }
                if (("P" in bb) && aa) {
                    var a6 = +bb.P;
                    if (bb.P === true) {
                        a6 = 5
                    }
                    if (a6) {
                        var bf = 0;
                        if ("#" in bb) {
                            var bg = T(bb["#"]);
                            if (bg) {
                                bf = bg.pt
                            }
                        }
                        a5 = U(a6 < 0 ? -1 : 1, Math.abs(a6), bf)
                    }
                }
                if ("p" in bb) {
                    var a9, a7, be = bb.p.split(";"),
                        a8 = new Point();
                    for (a7 in be) {
                        a9 = Y(be[a7]);
                        a8.addi(a9.pt)
                    }
                    a8.muli(1 / be.length);
                    if (!aU) {
                        a1(1)
                    }
                    a5 = a8.subi(aU.pt)
                }
                aQ.addi(a5);
                return a5
            }

            function Z(a5) {
                var ba, a7, a6 = ak(a5),
                    a9 = {
                        text: "_",
                        N: 1,
                        horiz: -1
                    };
                if (a6.H) {
                    a9.N = 0;
                    a9.style = ":"
                }
                if (a6.C) {
                    a9.N = 0;
                    a9.style = "|";
                    switch (a6.C || 0) {
                        case "-":
                            a9.arr0 = 1;
                            break;
                        case "+":
                            a9.arr0 = 1;
                            a9.arr1 = 1;
                            break;
                        default:
                            a9.arr1 = 1
                    }
                }
                if ("N" in a6) {
                    if (a6.N == "2x") {
                        a9.N = 2;
                        a9.cross = 1
                    } else {
                        a9.N = +a6.N
                    }
                }
                if ("h" in a6) {
                    a9.horiz = 1
                }
                if ("S" in a6) {
                    a9.style = a6.S
                }
                if ("T" in a6) {
                    a9.text = a6.T
                }
                if (">" in a6) {
                    a9.arr1 = 1
                }
                if ("<" in a6) {
                    a9.arr0 = 1
                }

                function i(bd, bc, bb) {
                    switch (a6[bd]) {
                        case "+":
                            a9.w0 = 0;
                            a9.w1 = bc;
                            break;
                        case "-":
                            a9.w0 = bc;
                            a9.w1 = 0;
                            break;
                        case "2":
                            a9.w0 = a9.w1 = bc;
                            break
                    }
                    if (bb) {
                        a4 = a9.w1
                    }
                }
                if ("w" in a6) {
                    i("w", 1)
                } else {
                    if ("W" in a6) {
                        i("W", 1, 1)
                    } else {
                        if ("d" in a6) {
                            i("d", -1)
                        } else {
                            if ("D" in a6) {
                                i("D", -1, 1)
                            } else {
                                a9.w0 = a9.w1 = a4
                            }
                        }
                    }
                }
                var a8 = aN(a6);
                an(a8, a9)
            }

            function j(ba) {
                var a6 = X[ax].L,
                    a9 = a6.length,
                    a5 = [];
                if (!a9) {
                    ap("Невозможно создать кольцо")
                }
                var bb = a6[--a9];
                if (!bb.nodes[1]) {
                    a1(1)
                }
                var a8 = bb.nodes[1],
                    a7, i = bb.nodes[0];
                a5.push(i);
                while (--a9 >= 0) {
                    bb = a6[a9];
                    a7 = bb.nodes[0];
                    if (bb.nodes[1] == i) {
                        a5.push(a7);
                        if (a7 == a8) {
                            break
                        }
                        i = a7
                    }
                }
                if (a7 != a8 || !a5.length) {
                    ap("Не удалось замкнуть кольцо")
                }
                bb = new ChemLink(ba);
                bb.type = "o";
                bb.nodes = a5;
                aj.links.push(bb)
            }
            var at, aC;
            var am = {
                begin: function() {
                    if (/\s/.test(a0)) {
                        return 1
                    }
                    if (a0 == '"') {
                        return aP("commPre", 1)
                    }
                    var i = au();
                    if (i !== null) {
                        return i
                    }
                    return aP("agent")
                },
                agent: function() {
                    aw(new ChemAgent());
                    aK();
                    return aP("agentPre")
                },
                agentPre: function() {
                    if (/\d/.test(a0)) {
                        aP("agentK")
                    } else {
                        if (a0 == "'") {
                            return aP("agentKAbs", 1)
                        } else {
                            aP("agentIn")
                        }
                    }
                    return 0
                },
                itemCustom: function() {
                    if (a0 != "}") {
                        aW += a0
                    } else {
                        aX(new ChemObjCustom(v(aW)));
                        aP("itemFinal")
                    }
                    return 1
                },
                charge: function() {
                    var a5 = aW + a0,
                        i = d(a5);
                    if (i !== null) {
                        return ay()
                    }
                    if (aU.charge = d(aW)) {
                        aU.charge.left = ag
                    }
                    ag = 0;
                    return aP("chargePost")
                },
                chargePost: function() {
                    if (a0 == '"') {
                        return aP("comm", 1)
                    }
                    return aP("agentMid")
                },
                commPre: function() {
                    if (a0 != '"') {
                        aW += a0
                    } else {
                        aL = aW;
                        aP("begin")
                    }
                    return 1
                },
                comm: function() {
                    if (a0 != '"') {
                        return ay()
                    }
                    if ("commentPost" in aj) {
                        aj.commentPost = l(aW);
                        return aP("begin", 1)
                    }
                    aX(new ChemObjComm(aW));
                    return aP("agentMid", 1)
                },
                agentK: function() {
                    if (/\d/.test(a0)) {
                        aW += a0;
                        return 1
                    }
                    aj.k = +aW;
                    return aP("agentPre")
                },
                agentKAbs: function() {
                    if (a0 != "'") {
                        aW += a0;
                        return 1
                    }
                    aj.k = aW;
                    return aP("agentPre", 1)
                },
                agentSpace: function() {
                    if (/\s/.test(a0)) {
                        return 1
                    }
                    return aP("agentIn")
                },
                agentIn: function() {
                    var i = aM();
                    if (i < 0) {
                        ap("Unknown element character '[C]'", {
                            C: a0
                        })
                    }
                    return i
                },
                agentMid: function() {
                    var i = aM();
                    if (i < 0) {
                        ad();
                        return aP("begin")
                    }
                    return i
                },
                agentElem: function() {
                    if (a0 >= "a" && a0 <= "z") {
                        aW += a0;
                        return 1
                    }
                    var i = MenTbl[aW];
                    if (!i) {
                        ap("Unknown element '[Elem]'", {
                            Elem: aW,
                            pos: aS + 1 - aW.length
                        })
                    }
                    aX(i);
                    return aP("itemFinal")
                },
                itemFinal: function() {
                    if (a2) {
                        aG().M = a2;
                        a2 = null
                    }
                    if (a0 >= "1" && a0 <= "9") {
                        return aP("elemCnt")
                    }
                    if (a0 == "'") {
                        return aP("elemCntAbs", 1)
                    }
                    if (a0 == "(") {
                        var a5 = ai.indexOf(")", aS + 1);
                        if (a5 >= 0) {
                            var a6 = ai.substring(aS + 1, a5),
                                i = d(a6);
                            if (i !== null) {
                                var a7 = aG();
                                if (a7) {
                                    a7.charge = i;
                                    aS = a5 + 1;
                                    return 0
                                }
                            }
                        }
                    }
                    return aP("agentMid")
                },
                elemCnt: function() {
                    if (a0 >= "0" && a0 <= "9") {
                        return ay()
                    }
                    aG().n = +aW;
                    return aP("itemFinal")
                },
                elemCntAbs: function() {
                    if (a0 != "'") {
                        return ay()
                    }
                    aG().n = aW;
                    return aP("itemFinal", 1)
                },
                negChar: function() {
                    ag = 1;
                    if (y[a0]) {
                        return aP("shortLink")
                    }
                    return aP("agentMid")
                },
                shortLink: function() {
                    var a5 = aW + a0,
                        i = w(a5);
                    if (i) {
                        return ay()
                    }
                    aC = aW;
                    return aP("shortLinkSfx")
                },
                shortLinkSfx: function() {
                    if ("0vwdh~x".indexOf(a0) >= 0) {
                        return ay()
                    }
                    V(aC, aW);
                    return aP("agentMid")
                },
                fullLink: function() {
                    if (a0 == "o") {
                        j("");
                        return aP("agentMid", 1)
                    }
                    if (a0 == "m") {
                        return aP("midPt", 1)
                    }
                    if (a0 == "p" || a0 == "q") {
                        var i = a0 == "p" ? 1 : -1,
                            a6 = 1,
                            a5 = "";
                        if (ai.charAt(++aS) == a0) {
                            a6 = 2;
                            aS++
                        }
                        while (/\d/.test(ai.charAt(aS))) {
                            a5 += ai.charAt(aS++)
                        }
                        a5 = (+a5) || 5;
                        av(i, a5, a6);
                        return aP("agentMid", 0)
                    }
                    if (a0 == "(") {
                        return aP("fullLink1", 1)
                    }
                    Z("");
                    return aP("agentMid")
                },
                fullLink1: function() {
                    if (a0 != ")") {
                        aW += a0;
                        return 1
                    }
                    Z(aW);
                    return aP("agentMid", 1)
                },
                midPt: function() {
                    if (a0 != "(") {
                        ap("Expected '(' after [S]", {
                            S: "_m"
                        })
                    } else {
                        return aP("midPtDef", 1)
                    }
                },
                midPtDef: function() {
                    if (a0 != ")") {
                        return ay(a0)
                    }
                    var i = ak(aW),
                        a5 = aN(i);
                    Q = Q || [];
                    Q.push(a5);
                    return aP("agentMid", 1)
                },
                label: function() {
                    if (/[\dA-Z]/i.test(a0)) {
                        return ay()
                    }
                    if (!aU) {
                        a1(1)
                    }
                    ac[aW] = aU;
                    return aP("agentMid")
                },
                nodeRef: function() {
                    at = "";
                    if (a0 >= "0" && a0 <= "9") {
                        return aP("nodeRefDig")
                    }
                    if (a0 == "-") {
                        at = a0;
                        return aP("nodeRefDig", 1)
                    }
                    if (/[A-Z]/i.test(a0)) {
                        return aP("nodeRefChr")
                    }
                    if (/\s/.test(a0)) {
                        return aP("agentSpace", 1)
                    }
                    at = a0;
                    return aP("nodeRefEnd")
                },
                nodeRefDig: function() {
                    if (a0 >= "0" && a0 <= "9") {
                        at += a0;
                        return 1
                    }
                    return aP("nodeRefEnd")
                },
                nodeRefChr: function() {
                    if (/[A-Z\d]/i.test(a0)) {
                        at += a0;
                        return 1
                    }
                    return aP("nodeRefEnd")
                },
                nodeRefEnd: function() {
                    var i = Y(at);
                    i.bFix = 1;
                    aD(i);
                    return aP("agentMid")
                },
                funcName: function() {
                    if (a0 != "(") {
                        return ay()
                    }
                    aJ = aW;
                    return aP("funcArg", 1)
                },
                funcArg: function() {
                    if (a0 != ")") {
                        return ay()
                    }
                    var i = funcs[aJ];
                    if (i) {
                        i(aW)
                    }
                    return aP("agentMid", 1)
                }
            };
            try {
                var aR = preProcess(ai);
                if (!aR.ok) {
                    ap(aR.msg)
                }
                ai = af.post = aR.dst;
                while (aS < ai.length) {
                    a0 = ai.charAt(aS);
                    aO = am[aB]();
                    if (aO > 0) {
                        aS++
                    }
                    if (aO < 0) {
                        break
                    }
                }
            } catch (aZ) {
                if (aZ instanceof u) {
                    af.error = aZ
                } else {
                    af.error = new u("Internal error: [msg]", {
                        msg: aZ.message
                    })
                }
            }
            return af
        };

        function M(P) {
            var L, T, O, Q = P[0],
                i = this.tables[0],
                S = [],
                R = [];
            for (O = 0; O < i.NCol; O++) {
                S.push(L = i.x1 + O);
                T = i.y1;
                while (T < Q.length && !Q[T][L]) {
                    T++
                }
                R.push(T);
                if (T < Q.length) {
                    Q[T - 1][L] = {
                        text: this.groupIds[O],
                        cls: this.groupCls
                    }
                }
            }
            T = R[7];
            if (this.groupIds[8].indexOf("8B") >= 0 && T < Q.length && T == R[8] && R[8] == R[9]) {
                L = S[7];
                T--;
                Q[T][L].text += Q[T][L + 1].text + Q[T][L + 2].text;
                Q[T][L].colspan = 3;
                Q[T][++L] = null;
                Q[T][++L] = null
            }
        }
        this.TblRules = {
            Std: {
                flGroups: 0,
                flPeriods: 0,
                flLanAct: 0,
                tables: [{
                    NCol: 18,
                    NRow: 7
                }, {
                    NCol: 15,
                    NRow: 2
                }],
                category: MenTblCategoryBlock,
                points: {
                    He: [17, 0],
                    B: [12, 1],
                    Al: [12, 2],
                    La: [0, 0, 1],
                    Hf: [3, 5],
                    Ac: [0, 1, 1],
                    Rf: [3, 6]
                },
                notes: {
                    La: [2, 5],
                    Ac: [2, 6]
                },
                groupIds: ["1A", "2A", "3B", "4B", "5B", "6B", "7B", "┌──", "─8B─", "──┐", "1B", "2B", "3A", "4A", "5A", "6A", "7A", "8A"],
                groupCls: "group-id",
                drawGroups: M
            },
            Wide: {
                tables: [{
                    NCol: 32,
                    NRow: 7
                }],
                category: MenTblCategoryProps,
                points: {
                    H: [0, 0],
                    He: [31, 0],
                    B: [26, 1],
                    Al: [26, 2],
                    Sc: [16, 3],
                    Y: [16, 4]
                },
                groupIds: "1A,2A,,,,,,,,,,,,,,,3B,4B,5B,6B,7B,┌──,8B,──┐,1B,2B,3A,4A,5A,6A,7A,8A".split(","),
                groupCls: "group-id",
                pre: function(i) {},
                drawGroups: M
            },
            Short: {
                tables: [{
                    NCol: 11,
                    NRow: 11,
                    periodCols: 2,
                    groupRows: 2
                }, {
                    NCol: 15,
                    NRow: 2
                }],
                points: {
                    H: [0, 0],
                    He: [10, 0],
                    Ne: [10, 1],
                    Ar: [10, 2],
                    Cu: [0, 4],
                    Kr: [10, 4],
                    Ag: [0, 6],
                    Xe: [10, 6],
                    La: [0, 0, 1],
                    Hf: [3, 7],
                    Au: [0, 8],
                    Rn: [10, 8],
                    Ac: [0, 1, 1],
                    Rf: [3, 9],
                    Rg: [0, 10]
                },
                flLanAct: 1,
                notes: {
                    La: [2, 7],
                    Ac: [2, 9]
                },
                category: MenTblCategoryBlock,
                categoryExt: [MenTblSubGroup],
                groupIds: "I:a;b,II:a;b,III:a;b,IV:a;b,V:a;b,VI:a;b,VII:a;b,::R,VIII:b:LR,::LR,:a:L".split(","),
                groupCls: "chem-cell",
                drawGroups: function(Q) {
                    var P, S, O, L, j = this.tables[0],
                        R = Q[0];
                    for (P = 0; P < j.NCol; P++) {
                        O = this.groupIds[P].split(":");
                        S = {
                            cls: this.groupCls,
                            rowspan: 2,
                            text: O[0] + '<div class="mentable-subgroup-hd">'
                        };
                        if (O.length > 1) {
                            L = O[1].split(";");
                            if (L.length == 2) {
                                S.text += '<span class="left">' + L[0] + '</span><span class="right">' + L[1] + "</span>"
                            } else {
                                S.text += L[0]
                            }
                        }
                        if (O.length > 2) {
                            if (O[2].indexOf("L") >= 0) {
                                S.cls += " noleft"
                            }
                            if (O[2].indexOf("R") >= 0) {
                                S.cls += " noright"
                            }
                        }
                        S.text += "</div>";
                        R[j.y1 - 2][P + j.x1] = S;
                        R[j.y1 - 1][P + j.x1] = null
                    }
                },
                drawPeriods: function(O) {
                    var L, Q, R = 1,
                        j = this.tables[0],
                        P = O[0];
                    for (L = 0; L < j.NRow; L++) {
                        Q = (L < 3 || L & 1) ? {
                            text: R++,
                            cls: "period-id"
                        } : null;
                        if (Q && L >= 3) {
                            Q.rowspan = 2
                        }
                        P[j.y1 + L][j.x1 - 2] = Q
                    }
                    for (L = 0; L < j.NRow; L++) {
                        P[j.y1 + L][j.x1 - 1] = {
                            text: L + 1,
                            cls: "period-id"
                        }
                    }
                },
                post: function(i) {
                    if (this.flGroups && this.flPeriods) {
                        i[0][0][0] = {
                            text: N("Group") + "→",
                            cls: "mentable-text period-id",
                            colspan: 2
                        };
                        i[0][0][1] = null;
                        i[0][1][0] = {
                            text: N("Period"),
                            cls: "mentable-text period-id"
                        };
                        i[0][1][1] = {
                            text: N("Row"),
                            cls: "mentable-text period-id"
                        }
                    }
                },
                pre: function(S) {
                    var O, Q, P = 0,
                        T, R = S[0],
                        L = this.tables[0];
                    for (; P < L.NRow; P++) {
                        T = R[P + L.y1];
                        for (Q = 0; Q < L.NCol; Q++) {
                            T[Q + L.x1] = (Q > 6 && Q < 10) ? {
                                cls: "chem-row"
                            } : {
                                cls: "chem-cell"
                            }
                        }
                    }
                }
            }
        };
        this.CellRender = function(i) {
            if (!i) {
                i = "number,id,name,mass"
            }
            if (typeof i == "string") {
                i = i.split(",")
            }
            this.fields = i;
            this.div = function(L, Q, O) {
                var j, P = '<div class="' + L + '"';
                if (O) {
                    for (j in O) {
                        P += " " + j + '="' + O[j] + '"'
                    }
                }
                return P + ">" + (Q + "").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>"
            };
            this.number = function(j) {
                return this.div("number", j.n)
            };
            this.id = function(j) {
                return this.div("id", j.id)
            };
            this.name = function(j) {
                return this.div("name", N(j.id))
            };
            this.mass = function(j) {
                return this.div("mass", j.M)
            };
            this.draw = function(O) {
                var j, P, L = "";
                for (j in this.fields) {
                    P = this.fields[j];
                    if (P in this) {
                        L += this[P](O)
                    }
                }
                return L
            }
        };
        this.drawTable = function(S) {
            if (!S) {
                S = this.TblRules.Std
            }
            var W = 0,
                ab, Y = 0,
                O, ae, P, Q, U, ac, ad = [];
            for (; W < S.tables.length; W++) {
                ac = S.tables[W];
                ad[W] = [];
                ac.width = ac.width || ac.NCol;
                ac.height = ac.height || ac.NRow;
                ac.ofsX = ac.ofsX || 0;
                ac.ofsY = ac.ofsY || 0;
                ac.w1 = ac.width;
                ac.h1 = ac.height;
                ac.x1 = ac.ofsX;
                ac.y1 = ac.ofsY;
                if (W == 0) {
                    if (S.flGroups) {
                        U = ac.groupRows || 1;
                        ac.y1 += U;
                        ac.h1 += U
                    }
                    if (S.flPeriods) {
                        U = ac.periodCols || 1;
                        ac.x1 += U;
                        ac.w1 += U
                    }
                }
                for (Y = 0; Y < ac.h1; Y++) {
                    ad[W][Y] = new Array(ac.w1)
                }
            }
            if (S.pre) {
                S.pre(ad)
            }
            var X, aa = [],
                T, L = [];
            if (S.category) {
                L.push(S.category)
            }
            if (S.categoryExt) {
                for (ab in S.categoryExt) {
                    L.push(S.categoryExt[ab])
                }
            }
            for (W in L) {
                T = L[W];
                aa.push(X = {});
                for (ab in T) {
                    ae = T[ab];
                    if (typeof ae == "string") {
                        ae = ae.split(",")
                    }
                    for (Y in ae) {
                        X[ae[Y]] = ab
                    }
                }
            }
            L = new Array(aa.length);
            ac = S.tables[U = 0];
            Y = ac.y1;
            ab = ac.x1;
            for (W in MenTbl) {
                ae = MenTbl[W];
                O = S.points[ae.id];
                if (O) {
                    ac = S.tables[U = O[2] || 0];
                    ab = O[0] + ac.x1;
                    Y = O[1] + ac.y1
                }
                Q = "chem-element";
                for (X in aa) {
                    T = aa[X];
                    if (T[ae.id]) {
                        L[X] = T[ae.id]
                    }
                }
                Q += " " + L.join(" ");
                ad[U][Y][ab] = {
                    elem: ae,
                    cls: Q
                };
                if (++ab == ac.x1 + ac.NCol) {
                    ab = ac.x1;
                    Y++
                }
            }
            if (S.flGroups) {
                if (S.drawGroups) {
                    S.drawGroups(ad)
                } else {
                    for (ab = 0; ab < ac.NCol; ab++) {
                        ad[0][ac.y1 - 1][ac.x1 + ab] = {
                            text: ab + 1
                        }
                    }
                }
            }
            ac = S.tables[0];
            if (S.flPeriods) {
                if (S.drawPeriods) {
                    S.drawPeriods(ad)
                } else {
                    for (ab = 0; ab < ac.NRow; ab++) {
                        ad[0][ac.y1 + ab][ac.x1 - 1] = {
                            text: ab + 1,
                            cls: "period-id"
                        }
                    }
                }
            }
            if (S.post) {
                S.post(ad)
            }
            var Z = {
                La: "57-71<br>" + N("Lanthanides"),
                Ac: "89-103<br>" + N("Actinides")
            };
            if (S.flLanAct && S.notes) {
                ac = S.tables[0];
                for (ab in S.notes) {
                    O = S.notes[ab];
                    ad[0][O[1] + ac.y1][O[0] + ac.x1] = {
                        text: Z[ab],
                        cls: "chem-cell mentable-text"
                    }
                }
            }
            var V = "",
                R = S.cellRender || new ChemSys.CellRender();
            for (W in ad) {
                V += S.beginTable ? S.beginTable(W) : '<table class="mentable">';
                U = ad[W];
                for (Y = 0; Y < U.length; Y++) {
                    P = U[Y];
                    V += "<tr>";
                    for (ab = 0; ab < P.length; ab++) {
                        ae = P[ab];
                        if (!ae) {
                            if (ae !== null) {
                                V += "<td></td>"
                            }
                        } else {
                            V += '<td class="' + (ae.cls ? ae.cls : "chem-element") + '"';
                            if (ae.colspan) {
                                V += ' colspan="' + ae.colspan + '"'
                            }
                            if (ae.rowspan) {
                                V += ' rowspan="' + ae.rowspan + '"'
                            }
                            V += ">";
                            if (ae.elem) {
                                V += R.draw(ae.elem)
                            } else {
                                if (ae.text) {
                                    V += ae.text
                                }
                            }
                            V += "</td>"
                        }
                    }
                    V += "</tr>"
                }
                V += "</table>"
            }
            return V
        };
        var g = navigator.language || navigator.browserLanguage || navigator.userLanguage;
        g = g.toLowerCase();
        this.curLang = this.navLang = g == "zh-tw" ? g : g.split("-")[0];
        this.Dict = {
            ru: {
                $Native: "Русский",
                $English: "Russian",
                "Internal error: [msg]": "Внутренняя ошибка: [msg]",
                "Unexpected '[C]' in position [pos]": "Неверный символ '[C]' в позиции [pos]",
                "Expected '[ok]' instead of '[bad]' in position [pos]": "Требуется '[ok]' вместо '[bad]' в позиции [pos]",
                "Invalid character '[C]' in position [pos]": "Недопустимый символ '[C]' в позиции [pos]",
                "Unknown element character '[C]' in position [pos]": "Недопустимый символ '[C]' описания реагента в позиции [pos]",
                "Expected '[C]' in position [pos]": "Требуется '[C]' в позиции [pos]",
                "Unknown element '[Elem]' in position [pos]": "Ошибочный элемент '[Elem]' в позиции [pos]",
                "Browser does not support canvas-graphics": "Браузер не поддерживает canvas-графику",
                "Formula can not be displayed as text": "Формулу нельзя отобразить в текстовом виде",
                "Expected '(' after [S]": " Требуется '(' после [S]",
                "Invalid version": "Формула требует версии системы [need] вместо [cur]",
                "(s)": "(тв)",
                "(l)": "(ж)",
                "(g)": "(г)",
                "(aq)": "(р-р)",
                "Periodic Table": "Периодическая система химических элементов",
                "Table legend": "Группы химических элементов",
                Group: "Группа",
                Period: "Период",
                Row: "Ряд",
                "[x]-block": "[x]-блок",
                Lanthanides: "Лантаноиды",
                Actinides: "Актиноиды",
                "Alkali metals": "Щелочные металлы",
                "Alkaline earth metals": "Щёлочноземельные металлы",
                "Transition metals": "Переходные металлы",
                "Post transition metals": "Постпереходные металлы",
                Metalloids: "Полуметаллы",
                "Other nonmetals": "Неметаллы",
                Halogens: "Галогены",
                "Noble gases": "Инертные газы",
                "Unknown props": "Св-ва неизвестны",
                H: "Водород",
                He: "Гелий",
                Li: "Литий",
                Be: "Бериллий",
                B: "Бор",
                C: "Углерод",
                N: "Азот",
                O: "Кислород",
                F: "Фтор",
                Ne: "Неон",
                Na: "Натрий",
                Mg: "Магний",
                Al: "Алюминий",
                Si: "Кремний",
                P: "Фосфор",
                S: "Сера",
                Cl: "Хлор",
                Ar: "Аргон",
                K: "Калий",
                Ca: "Кальций",
                Sc: "Скандий",
                Ti: "Титан",
                V: "Ванадий",
                Cr: "Хром",
                Mn: "Марганец",
                Fe: "Железо",
                Co: "Кобальт",
                Ni: "Никель",
                Cu: "Медь",
                Zn: "Цинк",
                Ga: "Галлий",
                Ge: "Германий",
                As: "Мышьяк",
                Se: "Селен",
                Br: "Бром",
                Kr: "Криптон",
                Rb: "Рубидий",
                Sr: "Стронций",
                Y: "Иттрий",
                Zr: "Цирконий",
                Nb: "Ниобий",
                Mo: "Молибден",
                Tc: "Технеций",
                Ru: "Рутений",
                Rh: "Родий",
                Pd: "Палладий",
                Ag: "Серебро",
                Cd: "Кадмий",
                In: "Индий",
                Sn: "Олово",
                Sb: "Сурьма",
                Te: "Теллур",
                I: "Йод",
                Xe: "Ксенон",
                Cs: "Цезий",
                Ba: "Барий",
                La: "Лантан",
                Ce: "Церий",
                Pr: "Празеодим",
                Nd: "Неодим",
                Pm: "Прометий",
                Sm: "Самарий",
                Eu: "Европий",
                Gd: "Гадолиний",
                Tb: "Тербий",
                Dy: "Диспрозий",
                Ho: "Гольмий",
                Er: "Эрбий",
                Tm: "Тулий",
                Yb: "Иттербий",
                Lu: "Лютеций",
                Hf: "Гафний",
                Ta: "Тантал",
                W: "Вольфрам",
                Re: "Рений",
                Os: "Осмий",
                Ir: "Иридий",
                Pt: "Платина",
                Au: "Золото",
                Hg: "Ртуть",
                Tl: "Таллий",
                Pb: "Свинец",
                Bi: "Висмут",
                Po: "Полоний",
                At: "Астат",
                Rn: "Радон",
                Fr: "Франций",
                Ra: "Радий",
                Ac: "Актиний",
                Th: "Торий",
                Pa: "Протактиний",
                U: "Уран",
                Np: "Нептуний",
                Pu: "Плутоний",
                Am: "Америций",
                Cm: "Кюрий",
                Bk: "Берклий",
                Cf: "Калифорний",
                Es: "Эйнштейний",
                Fm: "Фермий",
                Md: "Менделеевий",
                No: "Нобелий",
                Lr: "Лоуренсий",
                Rf: "Резерфордий",
                Db: "Дубний",
                Sg: "Сиборгий",
                Bh: "Борий",
                Hs: "Хассий",
                Mt: "Мейтнерий",
                Ds: "Дармштадтий",
                Rg: "Рентгений",
                Cn: "Коперниций",
                Nh: "Нихоний",
                Fl: "Флеровий",
                Mc: "Московий",
                Lv: "Ливерморий",
                Ts: "Теннессин",
                Og: "Оганесон"
            },
            en: {
                "Invalid version": "Required system version [need] instead of [cur]",
                $Native: "English",
                $English: "English",
                "Table legend": "Chemical element groups",
                H: "Hydrogen",
                He: "Helium",
                Li: "Lithium",
                Be: "Beryllium",
                B: "Boron",
                C: "Carbon",
                N: "Nitrogen",
                O: "Oxygen",
                F: "Fluorine",
                Ne: "Neon",
                Na: "Sodium",
                Mg: "Magnesium",
                Al: "Aluminium",
                Si: "Silicon",
                P: "Phosphorus",
                S: "Sulfur",
                Cl: "Chlorine",
                Ar: "Argon",
                K: "Potassium",
                Ca: "Calcium",
                Sc: "Scandium",
                Ti: "Titanium",
                V: "Vanadium",
                Cr: "Chromium",
                Mn: "Manganese",
                Fe: "Iron",
                Co: "Cobalt",
                Ni: "Nickel",
                Cu: "Copper",
                Zn: "Zinc",
                Ga: "Gallium",
                Ge: "Germanium",
                As: "Arsenic",
                Se: "Selenium",
                Br: "Bromine",
                Kr: "Krypton",
                Rb: "Rubidium",
                Sr: "Strontium",
                Y: "Yttrium",
                Zr: "Zirconium",
                Nb: "Niobium",
                Mo: "Molybdenum",
                Tc: "Technetium",
                Ru: "Ruthenium",
                Rh: "Rhodium",
                Pd: "Palladium",
                Ag: "Silver",
                Cd: "Cadmium",
                In: "Indium",
                Sn: "Tin",
                Sb: "Antimony",
                Te: "Tellurium",
                I: "Iodine",
                Xe: "Xenon",
                Cs: "Caesium",
                Ba: "Barium",
                La: "Lanthanum",
                Ce: "Cerium",
                Pr: "Praseodymium",
                Nd: "Neodymium",
                Pm: "Promethium",
                Sm: "Samarium",
                Eu: "Europium",
                Gd: "Gadolinium",
                Tb: "Terbium",
                Dy: "Dysprosium",
                Ho: "Holmium",
                Er: "Erbium",
                Tm: "Thulium",
                Yb: "Ytterbium",
                Lu: "Lutetium",
                Hf: "Hafnium",
                Ta: "Tantalum",
                W: "Tungsten",
                Re: "Rhenium",
                Os: "Osmium",
                Ir: "Iridium",
                Pt: "Platinum",
                Au: "Gold",
                Hg: "Mercury",
                Tl: "Thallium",
                Pb: "Lead",
                Bi: "Bismuth",
                Po: "Polonium",
                At: "Astatine",
                Rn: "Radon",
                Fr: "Francium",
                Ra: "Radium",
                Ac: "Actinium",
                Th: "Thorium",
                Pa: "Protactinium",
                U: "Uranium",
                Np: "Neptunium",
                Pu: "Plutonium",
                Am: "Americium",
                Cm: "Curium",
                Bk: "Berkelium",
                Cf: "Californium",
                Es: "Einsteinium",
                Fm: "Fermium",
                Md: "Mendelevium",
                No: "Nobelium",
                Lr: "Lawrencium",
                Rf: "Rutherfordium",
                Db: "Dubnium",
                Sg: "Seaborgium",
                Bh: "Bohrium",
                Hs: "Hassium",
                Mt: "Meitnerium",
                Ds: "Darmstadtium",
                Rg: "Roentgenium",
                Cn: "Copernicium",
                Nh: "Nihonium",
                Fl: "Flerovium",
                Mc: "Moscovium",
                Lv: "Livermorium",
                Ts: "Tennessine",
                Og: "Oganesson"
            }
        };
        this.addDict = function(P) {
            var O, j, L, i;
            for (O in P) {
                j = P[O];
                L = this.Dict[O];
                if (!L) {
                    this.Dict[O] = j
                } else {
                    for (i in j) {
                        L[i] = j[i]
                    }
                }
            }
        };

        function N(L, R, Q) {
            var j, P = ChemSys.Dict[Q || ChemSys.curLang] || ChemSys.Dict.en,
                O = P[L];
            if (O === undefined) {
                O = L
            }
            if (R) {
                for (j in R) {
                    O = O.replace(new RegExp("\\[" + j + "\\]", "g"), R[j])
                }
            }
            return O
        }
        this.lang = N;

        function A(i) {
            this.type = i;
            this.pos = new Point();
            this.sz = new Point()
        }

        function h(i) {
            A.call(this, "lines");
            this.pts = [];
            this.bFill = !!i;
            this.w = 1
        }
        h.prototype = {
            add: function(j, i) {
                var L = j.clone();
                if (i) {
                    L.mv = i
                }
                this.pts.push(L)
            }
        };

        function J() {
            this.pts = [];
            A.call(this, "curve")
        }
        J.prototype = {
            add: function(O) {
                function j(P, i) {
                    P.pts.push(i.clone())
                }
                if (O instanceof Array) {
                    for (var L in O) {
                        j(this, O[L])
                    }
                } else {
                    j(this, O)
                }
            }
        };

        function G() {
            A.call(this, "frame");
            this.org = new Point();
            this.frms = [];
            this.prims = []
        }
        G.prototype = {
            add: function(i) {
                this[i.type == "frame" ? "frms" : "prims"].push(i)
            },
            update: function() {
                var L = 0,
                    j, Q, R, O;

                function P(i) {
                    for (Q in i) {
                        R = i[Q];
                        O = R.pos.addx(R.sz);
                        if (!L) {
                            L = R.pos.clone();
                            j = O
                        } else {
                            L.mini(R.pos);
                            j.maxi(O)
                        }
                    }
                }
                P(this.frms);
                P(this.prims);
                if (L) {
                    this.org = L;
                    this.sz = j.subi(L)
                }
            }
        };
        this.buildFrame = function(L, am) {
            var ag = new G(),
                U, aq, av, S, ao, T, R = [0, 0, 0],
                ab = am.lineLen,
                ac = ab.line,
                W = ab.horiz,
                O = ab.thick,
                P = ab.width,
                ai = ab.dash,
                ak = ab.width * 2,
                i = ab.width * 1.5,
                al, ae, ax = 0,
                af = 0,
                Q = {
                    text: "A",
                    fntId: "std",
                    sz: new Point()
                };
            am.setTextProps(Q);
            R[1] = Q.sz.y / 2;
            Q.fntId = "half";
            am.setTextProps(Q);
            R[2] = R[1] - Q.sz.y;

            function au(X, j) {
                if (av.bCenter) {
                    j = 5
                }
                if (!al || j > ae) {
                    al = X;
                    ae = j
                }
            }

            function aw(ay, X, Y) {
                var j = new A("text");
                ay += "";
                j.fntId = X;
                j.text = ay;
                am.setTextProps(j);
                if (Y.color) {
                    j.color = Y.color
                }
                ao = Math.max(ao, j.sz.y);
                return j
            }

            function ah(j, Y, ay) {
                if (ax) {
                    return
                }
                var X = aw(j, Y, av);
                aq.add(X);
                if (!ay) {
                    T[0] = Math.max(T[1], T[2])
                }
                X.pos.init(T[ay], R[ay]);
                T[ay] += X.sz.x;
                if (!ay) {
                    T[2] = T[1] = T[0]
                }
                return X
            }

            function V(j) {
                var Y = aq.prims[aq.prims.length - 1];
                if (!Y) {
                    return
                }
                var X = aw(j, "half", av);
                aq.add(X);
                X.pos = new Point(Y.pos.x + (Y.sz.x - X.sz.x) / 2, Y.pos.y - X.sz.y * 0.8)
            }
            var ad, aa = 0;

            function an(X) {
                var j = ad.charge;
                if (j && j.left == X) {
                    ah(j.text, "half", 2)
                }
            }
            var ar = 1;
            L.walk({
                entityPre: function(j) {
                    ag.add(U = new G())
                },
                agentPre: function(j) {
                    if (!U) {
                        ag.add(U = new G());
                        aa = 1
                    }
                },
                nodePre: function(j) {
                    ax = j.bAuto;
                    U.add(aq = new G());
                    T = [0, 0, 0];
                    al = null;
                    ae = 0;
                    ar = 1;
                    ad = j
                },
                itemPre: function(j) {
                    T[0] = T[1] = T[2] = Math.max(T[1], T[2]);
                    av = j;
                    if (j.M) {
                        ah(j.M, "half", 2)
                    }
                    if (ar) {
                        an(ar--)
                    }
                    S = new Point(T[0], R[0]);
                    ao = 0
                },
                atom: function(Y) {
                    if (ax) {
                        return
                    }
                    var j = ah(Y.id, "Atom", 0);
                    var X = 2;
                    if (Y.id == "H") {
                        X = 1
                    } else {
                        if (Y.id == "C") {
                            X = 3
                        }
                    }
                    au(j, X);
                    if (av.atomColor) {
                        j.color = av.atomColor
                    }
                },
                custom: function(j) {
                    ah(j.text, "Custom", 0)
                },
                comm: function(j) {
                    ah(j.text, "Comment", 0)
                },
                groupPre: function(j) {
                    ah(j.beg, "std", 0)
                },
                groupPost: function(j) {
                    ah(j.end, "std", 0)
                },
                itemPost: function(az) {
                    var aC, aD, aH = new Point(T[0], R[0] + ao);
                    if (az.charge) {
                        V(az.charge.text)
                    }
                    if (az.n != 1) {
                        ah(az.n, "half", 1)
                    }
                    if (!ad.bAuto && (aC = az.dots)) {
                        var aA, ay, aK, aG;

                        function Y(aO, aM) {
                            var aN = ak * 2;
                            if (aA & 2) {
                                aN = -aN
                            }
                            if (aM) {
                                aN = -aN
                            }
                            return aO + aN
                        }
                        for (aA = 0; aA < 8; aA++) {
                            ay = 1 << aA;
                            if (!(aC & ay)) {
                                continue
                            }
                            aq.add(aD = new A("circle"));
                            if (aA < 2 || aA == 4 || aA == 5) {
                                aK = Y((S.x + aH.x) / 2, aA & 1)
                            } else {
                                aK = aA & 1 ? Y(aH.x - ak, 1) : Y(S.x + ak)
                            }
                            aG = aA & 4 ? Y(aH.y - ak) : Y(S.y + ak, 1);
                            aD.c = new Point(aK, aG);
                            aD.r = i;
                            aD.color = az.color;
                            aD.bFill = 1
                        }
                    }
                    if (!ad.bAuto && (aC = az.dashes)) {
                        aq.add(aD = new h());
                        aD.color = az.color;
                        var aK, aG, X = S.x - ak,
                            j = aH.x + ak,
                            aJ = S.y - ak,
                            aF = aH.y + ak,
                            aB = Math.min(aH.x - S.x - ak, aH.y - S.y - ak);

                        function aL(aN, aM, aP, aO) {
                            aD.add(new Point(aN, aM), 1);
                            aD.add(new Point(aP, aO))
                        }
                        if (aC & 1) {
                            aL(aK = (X + j - aB) / 2, aJ, aK + aB, aJ)
                        }
                        if (aC & 8) {
                            aL(j, aG = (aJ + aF - aB) / 2, j, aG + aB)
                        }
                        if (aC & 2) {
                            aL(aK = (X + j - aB) / 2, aF, aK + aB, aF)
                        }
                        if (aC & 4) {
                            aL(X, aG = (aJ + aF - aB) / 2, X, aG + aB)
                        }
                        var aE = aB * 0.53,
                            aI = aB * 0.17677;
                        if (aC & 16) {
                            aL(X + aE, aJ - aI, X - aI, aJ + aE)
                        }
                        if (aC & 32) {
                            aL(j - aE, aJ - aI, j + aI, aJ + aE)
                        }
                        if (aC & 64) {
                            aL(X + aE, aF + aI, X - aI, aF - aE)
                        }
                        if (aC & 128) {
                            aL(j - aE, aF + aI, j + aI, aF - aE)
                        }
                    }
                },
                nodePost: function(j) {
                    an(0);
                    ax = 0;
                    aq.update();
                    if (al) {
                        aq.c = al.sz.mulx(0.5).addi(al.pos)
                    } else {
                        aq.c = aq.sz.mulx(0.5).addi(aq.org)
                    }
                },
                agentPost: function(X) {
                    if (X.nodes.length == 0) {
                        return
                    }
                    var a0, bd, bl, bk, a7, bh = O / 2,
                        aS, aH = {};
                    var be, bc, az, aP, a9, bb = X.nodes[0].sc;
                    for (be in X.nodes) {
                        X.nodes[be].ufl = 0
                    }
                    for (be in X.links) {
                        az = X.links[be];
                        for (bc = 0; bc < az.nodes.length; bc++) {
                            aP = az.nodes[bc];
                            if (aP.ufl++) {
                                continue
                            }
                            a9 = U.frms[aP.i];
                            var aD = aP.pt.mulx(ac);
                            if (aP.sc != bb) {
                                aS = aH[aP.sc];
                                if (!aS) {
                                    var aF = az.nodes[bc ^ 1];
                                    if (!aF) {
                                        return
                                    }
                                    var aJ = U.frms[aF.i];
                                    if (!aJ) {
                                        return
                                    }
                                    var ay = (aP.pt.x - aF.pt.x) * W;
                                    bl = aJ.pos.clone();
                                    bl.y += aJ.c.y;
                                    if (ay < 0) {
                                        bl.x += ay - a9.sz.x + a9.c.x
                                    } else {
                                        bl.x += aJ.sz.x + ay + a9.c.x
                                    }
                                    aS = bl.subx(aD);
                                    aH[aP.sc] = aS
                                }
                                aD.addi(aS)
                            }
                            a9.pos = aD.subi(a9.c)
                        }
                    }

                    function bi(a2, bo) {
                        var a1 = a2.nodes[bo];
                        var j = U.frms[a1.i];
                        var bn = j.pos.addx(j.c);
                        if (a2.bHoriz) {
                            bn.x = j.pos.x;
                            if (a1.pt.x - a2.nodes[bo ^ 1].pt.x < 0) {
                                bn.x += j.sz.x
                            }
                        }
                        return bn
                    }
                    var aZ;

                    function aI(a1, j, bn) {
                        var a2 = new Point();
                        if (Math.abs(a1.x - j.x) < Math.abs(a1.y - j.y)) {
                            a2.x = bn
                        } else {
                            a2.y = bn
                        }
                        return a2
                    }

                    function aR(bq, by, bw) {
                        if (bq.bAuto) {
                            return by
                        }
                        if (ChemSys.isEmptyNode(bq)) {
                            return by
                        }

                        function a1(bA, bB) {
                            return bA ? 1 << bB : 0
                        }

                        function j(bA) {
                            return a1(bA.x < bn.x, 0) | a1(bA.x > a2.x, 1) | a1(bA.y < bn.y, 2) | a1(bA.y > a2.y, 3)
                        }
                        var bs = U.frms[bq.i],
                            bu, br, bn, a2, bx, bp, bo, bz = bw.subx(by),
                            bt = bz.y == 0 ? 1000000 : Math.abs(bz.x / bz.y),
                            bv;
                        for (bu in bs.prims) {
                            br = bs.prims[bu];
                            bn = br.pos.addx(bs.pos);
                            a2 = bn.addx(br.sz);
                            a2.y -= br.sz.y * 0.2;
                            bv = Math.abs(br.sz.x / (a2.y - bn.y));
                            bp = j(by);
                            bo = j(bw);
                            if (bo == 0) {
                                return bw
                            }
                            if (bp != 0) {
                                continue
                            }
                            if (bo & 2 && bv < bt) {
                                by.y += (a2.x - by.x) * bz.y / bz.x;
                                by.x = a2.x;
                                return by
                            }
                            if (bo & 1 && bv < bt) {
                                by.y += (bn.x - by.x) * bz.y / bz.x;
                                by.x = bn.x;
                                return by
                            }
                            if (bo & 4) {
                                by.x += (bn.y - by.y) * bz.x / bz.y;
                                by.y = bn.y;
                                return by
                            }
                            if (bo & 8) {
                                by.x += (a2.y - by.y) * bz.x / bz.y;
                                by.y = a2.y;
                                return by
                            }
                        }
                        return by
                    }

                    function aM(bn, a2) {
                        var a1 = bi(az, bn),
                            j = bi(az, a2);
                        if (!az.bHoriz) {
                            a1 = aR(az.nodes[bn], a1, j);
                            j = aR(az.nodes[a2], j, a1)
                        }
                        return [a1, j]
                    }

                    function aQ(bq, bp, bn) {
                        var bs = aM(bq, bp),
                            bu = bs[0];
                        bk = bs[1], a7 = aI(bu, bk, bh), aL = bk.subx(a7), aK = bk.addx(a7);
                        U.add(a0 = new h(!bn));
                        if (bn) {
                            aL.subi(bu);
                            aK.subi(bu);
                            var bt = bk.dist(bu),
                                a2 = aL.length(),
                                a1 = aK.length();
                            var br, j = 3,
                                bo = 1 / bt;
                            for (br = 0; br < bt; br += j) {
                                a0.add(aL.mulx(br * bo).addi(bu), 1);
                                a0.add(aK.mulx(br * bo).addi(bu))
                            }
                        } else {
                            a0.w = P;
                            a0.add(bu, 1);
                            a0.add(aL);
                            a0.add(aK);
                            a0.add(bu)
                        }
                    }
                    for (be in X.links) {
                        az = X.links[be];
                        aZ = P;
                        if (az.w0 > 0 && az.w1 > 0) {
                            aZ = O
                        }
                        bd = az.nodes;
                        if (az.w0 < 0 && az.w1 < 0) {
                            var aX = aM(0, 1);
                            bl = aX[0];
                            bk = aX[1];
                            var aW = bk.subx(bl),
                                a7 = aI(bl, bk, bh),
                                aC, aG = aW.length(),
                                ba, aB = 1 / aG;
                            U.add(a0 = new h());
                            for (ba = 0; ba < aG; ba += 3) {
                                aC = bl.addx(aW.mulx(aB * ba));
                                a0.add(aC.addx(a7), 1);
                                a0.add(aC.subx(a7))
                            }
                        } else {
                            if (!az.w0 && az.w1) {
                                aQ(0, 1, az.w1 < 0)
                            } else {
                                if (az.midPts) {
                                    var be, bg = az.midPts,
                                        bf = [],
                                        aV = bi(az, 0),
                                        aT = bi(az, 1),
                                        Y = aV.clone();
                                    for (be in bg) {
                                        Y.addi(bg[be].mulx(ac));
                                        bf.push(Y.clone())
                                    }
                                    aV = aR(az.nodes[0], aV, bf[0]);
                                    aT = aR(az.nodes[1], aT, bf[bf.length - 1]);
                                    bf.unshift(aV);
                                    bf.push(aT);
                                    U.add(a0 = new J());
                                    a0.add(bf)
                                } else {
                                    if (az.w0 && !az.w1) {
                                        aQ(1, 0, az.w0 < 0)
                                    } else {
                                        if (bd.length == 2) {
                                            U.add(a0 = new h());
                                            a0.w = aZ;
                                            var aO = a0.style = az.style,
                                                ba, bm, aY = aM(0, 1);
                                            bl = aY[0];
                                            bk = aY[1];
                                            if (az.N == 2 || az.N == 3) {
                                                a7 = new Point();
                                                var aA = bh * (az.N - 1);
                                                if (Math.abs(bl.x - bk.x) < Math.abs(bl.y - bk.y)) {
                                                    a7.x = aA
                                                } else {
                                                    a7.y = aA
                                                }
                                                var a8 = bl.subx(a7),
                                                    aL = bk.subx(a7),
                                                    a6 = bl.addx(a7),
                                                    aK = bk.addx(a7);
                                                if (az.N == 2 && az.cross) {
                                                    var a5 = aL;
                                                    aL = aK;
                                                    aK = a5
                                                }
                                                a0.add(a8, 1);
                                                a0.add(aL);
                                                a0.add(a6, 1);
                                                a0.add(aK)
                                            }
                                            if (az.N == 1 || az.N == 3 || (az.N == 0 && aO)) {
                                                a0.add(bl, 1);
                                                a0.add(bk);

                                                function aN(a2, bo) {
                                                    U.add(aln = new h());
                                                    var bn = bo.subx(a2);
                                                    var j = bn.length();
                                                    bn.muli(ab.arrowX / j);
                                                    var a1 = bo.subx(bn);
                                                    aln.add(bo, 1);
                                                    aln.add(a1.addx(bn.y / 2, -bn.x / 2));
                                                    aln.add(bo, 1);
                                                    aln.add(a1.addx(-bn.y / 2, bn.x / 2))
                                                }
                                                if (az.arr1) {
                                                    aN(bl, bk)
                                                }
                                                if (az.arr0) {
                                                    aN(bk, bl)
                                                }
                                            }
                                        } else {
                                            var bj = new Point(),
                                                a3 = [];
                                            for (bc in bd) {
                                                a3.push(bi(az, bc));
                                                bj.addi(a3[bc])
                                            }
                                            bj.muli(1 / bd.length);
                                            U.add(a0 = new A("circle"));
                                            a0.c = bj;
                                            a0.w = P;
                                            var ba, aE, a4 = null,
                                                aU = a3.length;
                                            for (bc = 0; bc < aU; bc++) {
                                                ba = (bc + 1) % aU;
                                                aE = bj.distSqr(a3[bc].addx(a3[ba]).muli(0.5));
                                                a4 = !a4 ? aE : Math.min(aE)
                                            }
                                            a0.r = 0.65 * Math.sqrt(a4)
                                        }
                                    }
                                }
                            }
                        }
                        a0.color = az.color
                    }
                    if (aa) {
                        Z(X)
                    }
                },
                operation: function(Y) {
                    var X = aw(Y.dstText, "std", Y);
                    U.add(X);
                    U.c = X.sz.mulx(0.5);
                    if (Y.commentPre) {
                        var j = aw(Y.commentPre, "std", Y);
                        U.add(j);
                        j.pos.init((X.sz.x - j.sz.x) / 2, -0.6 * j.sz.y)
                    }
                    if (Y.commentPost) {
                        var j = aw(Y.commentPost, "std", Y);
                        U.add(j);
                        j.pos.init((X.sz.x - j.sz.x) / 2, 0.75 * X.sz.y)
                    }
                },
                entityPost: function(j) {
                    Z(j)
                }
            });

            function Z(az) {
                U.update();
                var ay, aD = U.c || new Point(),
                    aA = U.frms;
                if (aA.length) {
                    for (ay in aA) {
                        aD.addi(aA[ay].pos).addi(aA[ay].c)
                    }
                    aD.muli(1 / aA.length)
                }
                U.c = aD;
                var aB = aD.y - U.org.y,
                    aE = Math.max(aE, aB),
                    Y = az.k;
                if (Y && Y != 1) {
                    var X = aw(Y, "AgentK", {});
                    U.add(X);
                    var aC = X.sz;
                    aC.x += Q.sz.x / 4;
                    X.pos.init(U.org.x - aC.x, aD.y - aC.y / 2);
                    U.update()
                }
            }
            var aj = 0,
                ap, at;
            for (ap in ag.frms) {
                at = ag.frms[ap];
                at.pos = new Point(aj, af - (at.c.y - at.org.y));
                aj += at.sz.x + 10
            }
            ag.update();
            ag.pos.addi(3);
            ag.sz.addi(6);
            return ag
        };
        var I = {
            fntList: ["std", "half", "Atom", "AgentK", "Custom", "Comment", "OpComment"],
            lineScale: function(i) {}
        };
        this.graphProps = function(P, Z) {
            Z = Z || this.rulesHtml;
            var S, O, T, W = {
                color: "black",
                bkColor: 0,
                fonts: {},
                lineLen: {}
            };
            W.lineLen = {
                line: 30,
                horiz: 10,
                thick: 4,
                width: 1,
                arrowX: 8,
                arrowY: 3,
                dash: 3
            };
            try {
                var V, Y, aa, R, j, X = document.createElement("span");
                P.appendChild(X);
                aa = z.getComputedStyle(X);
                W.color = aa.color;
                if (aa.backgroundColor.indexOf("transparent") < 0) {
                    W.bkColor = aa.backgroundColor
                }
                for (S in I.fntList) {
                    O = I.fntList[S];
                    R = r(Z, O, "A");
                    X.innerHTML = R;
                    j = R.charAt(0) == "<" ? X.firstChild : X;
                    aa = z.getComputedStyle(j);
                    Y = aa.fontWeight;
                    V = aa.fontSize;
                    if (/^\d*px$/.test(V)) {
                        V = +(V.substring(0, V.length - 2))
                    } else {
                        V = j.innerHeight
                    }
                    if (O == "half") {
                        V = Math.round(V * 0.6)
                    }
                    W.fonts[O] = {
                        size: V,
                        color: aa.color,
                        family: aa.fontFamily,
                        bold: (+Y) ? Y > 500 : Y == "bold",
                        italic: aa.fontStyle == "italic"
                    }
                }
            } finally {
                if (X) {
                    P.removeChild(X)
                }
            }
            var U = W.fonts.std.size * 1.6,
                Q = U / 30;
            for (S in W.lineLen) {
                W.lineLen[S] *= Q
            }
            W.prototype = I;
            return W
        };
        this.draw = function(O, W, ab) {
            var P = 0,
                ac = 0;
            try {
                P = document.createElement("CANVAS");
                if (P && P.getContext) {
                    ac = P.getContext("2d")
                }
            } catch (V) {}
            if (!ac) {
                O.innerHTML = this.lang("Browser does not support canvas-graphics");
                return 0
            }
            var Y = this.graphProps(O, ab),
                L = Y.color,
                X = Y.bkColor,
                R, T, Q, U = {};
            for (R in Y.fonts) {
                T = Y.fonts[R];
                U[R] = Q = {
                    fnt: "",
                    h: T.size,
                    color: T.color
                };
                if (T.italic) {
                    Q.fnt += "italic "
                }
                if (T.bold) {
                    Q.fnt += "bold "
                }
                Q.fnt += T.size + "px " + T.family
            }
            try {
                var S = Y.lineLen.dash,
                    aa = this.buildFrame(W, {
                        lineLen: Y.lineLen,
                        setTextProps: function(ad) {
                            var ae = U[ad.fntId];
                            ac.font = ad.fnt = ae.fnt;
                            var j = ac.measureText(ad.text);
                            if (!j) {
                                ad.sz.init(ae.h * 0.6, ae.h)
                            } else {
                                ad.sz.init(j.width, ae.h)
                            }
                            ad.color = ae.color
                        }
                    });
                P.width = aa.sz.x;
                P.height = aa.sz.y;
                ac.textBaseline = "top";
                ac.textAlign = "left";
                if (X) {
                    ac.fillStyle = X;
                    ac.fillRect(0, 0, aa.sz.x, aa.sz.y)
                }

                function i(ag, ad, aw) {
                    var at, aq, ai, al, ak, af, ao = ad.subx(ag.org).addx(ag.pos);
                    for (at in ag.frms) {
                        i(ag.frms[at], ao, aw)
                    }
                    for (at in ag.prims) {
                        ai = ag.prims[at];
                        if (ai.type == "text" && aw) {
                            ak = ao.addx(ai.pos);
                            ac.fillStyle = ai.color || L;
                            ac.font = ai.fnt;
                            ac.fillText(ai.text, ak.x, ak.y)
                        } else {
                            if (ai.type == "curve") {
                                var ah = [];
                                for (aq in ai.pts) {
                                    ah[aq] = ai.pts[aq].addx(ao)
                                }
                                ac.moveTo(ah[0].x, ah[0].y);
                                if (ah.length == 3) {
                                    ac.quadraticCurveTo(ah[1].x, ah[1].y, ah[2].x, ah[2].y)
                                } else {
                                    if (ah.length == 4) {
                                        ac.bezierCurveTo(ah[1].x, ah[1].y, ah[2].x, ah[2].y, ah[3].x, ah[3].y)
                                    }
                                }
                                ac.strokeStyle = ai.color || L;
                                ac.stroke()
                            } else {
                                if (ai.type == "lines" && !aw) {
                                    ac.lineWidth = ai.w;
                                    ac.beginPath();
                                    for (aq in ai.pts) {
                                        al = ai.pts[aq];
                                        ak = ao.addx(al);
                                        if (ai.style == ":") {
                                            if (al.mv) {
                                                af = al
                                            } else {
                                                var ah = al.subx(af),
                                                    au = ah.length();
                                                var ap, ar = au / S / 2;
                                                for (ap = 0; ap < ar; ap++) {
                                                    var ax = ao.addx(af.addx(ah.mulx(ap / ar)));
                                                    var av = ax.addx(ah.mulx(S / au));
                                                    ac.moveTo(ax.x, ax.y);
                                                    ac.lineTo(av.x, av.y)
                                                }
                                            }
                                        } else {
                                            if (ai.style == "~") {
                                                if (al.mv) {
                                                    af = ak
                                                } else {
                                                    var ax = af.clone(),
                                                        av, am, aj;
                                                    var ah = ak.subx(af),
                                                        au = ah.length(),
                                                        an = Y.lineLen.line / 6,
                                                        ay = Math.floor((au + an / 2) / an),
                                                        ae = ah.mulx(an / au);
                                                    au /= ay;
                                                    ah.muli(1 / ay);
                                                    ac.moveTo(ax.x, ax.y);
                                                    for (ap = 0; ap < ay; ap++) {
                                                        av = ax.addx(ah);
                                                        if ((ap & 1) == 0) {
                                                            am = ax.addx(ae.y, -ae.x)
                                                        } else {
                                                            am = ax.addx(-ae.y, ae.x)
                                                        }
                                                        aj = am.addx(ah);
                                                        ac.bezierCurveTo(am.x, am.y, aj.x, aj.y, av.x, av.y);
                                                        ax = av
                                                    }
                                                }
                                            } else {
                                                if (al.mv) {
                                                    ac.moveTo(ak.x, ak.y)
                                                } else {
                                                    ac.lineTo(ak.x, ak.y)
                                                }
                                            }
                                        }
                                    }
                                    if (ai.bFill) {
                                        ac.fillStyle = ai.color || L;
                                        ac.fill()
                                    }
                                    ac.strokeStyle = ai.color || L;
                                    ac.stroke()
                                } else {
                                    if (ai.type == "circle" && !aw) {
                                        ac.beginPath();
                                        ak = ao.addx(ai.c);
                                        ac.arc(ak.x, ak.y, ai.r, 0, 2 * Math.PI, false);
                                        if (ai.bFill) {
                                            ac.fillStyle = ai.color || L;
                                            ac.fill()
                                        }
                                        ac.strokeStyle = ai.color || L;
                                        ac.stroke()
                                    }
                                }
                            }
                        }
                    }
                }
                var Z = new Point(0);
                i(aa, Z, 0);
                ac.stroke();
                i(aa, Z, 1);
                O.appendChild(P);
                return 1
            } catch (V) {
                O.innerHTML = "Error: " + V.message;
                return 0
            }
        }
    }(),
    ChemJQ = {
        draw: function(b, a) {
            var c = jQuery(a).empty();
            if (b.isOk && !b.isOk()) {
                return
            }
            if (b.isLinear()) {
                c.html(ChemSys.makeHtml(b))
            } else {
                ChemSys.draw(c[0], b)
            }
        },
        autoCompileSingle: function(a) {
            var b = $(a).text();
            this.draw(ChemSys.compile(b), a)
        },
        autoCompile: function(a) {
            a = a || ".echem-formula";
            jQuery(a).each(function() {
                ChemJQ.autoCompileSingle(this)
            })
        }
    };
if ("jQuery" in window) {
    jQuery(function() {
        if (jQuery("body").hasClass("echem-auto-compile") || jQuery(".easyChemConfig").hasClass("auto-compile")) {
            ChemJQ.autoCompile()
        }
    })
}

function Macros(a) {
    this.name = a;
    this.body = "";
    this.exec = function(b) {
        return this.body
    }
}

function scanPar(d, f) {
    var e, a = 0,
        b = 0;
    while (f < d.length) {
        e = d.charAt(f);
        if (e == '"') {
            b = !b
        } else {
            if (e == "(" && !b) {
                a++
            } else {
                if (e == "," && !b && a == 0) {
                    break
                } else {
                    if (e == ")" && !b) {
                        if (a > 0) {
                            a--
                        } else {
                            break
                        }
                    }
                }
            }
        }
        f++
    }
    return f
}

function preProcess(b) {
    var j = /[A-Z]/i,
        c = /^[A-Z][A-Z\d]*$/i;

    function h(e) {
        $("<div/>").html(e).appendTo("#Debug")
    }

    function o(p, e) {
        this.src = "";
        this.dst = "";
        this.stk = [];
        this.pos = 0;
        if (p instanceof o) {
            this.src = p.src;
            this.pos = p.pos
        } else {
            if (typeof p == "string") {
                this.src = p;
                if (e) {
                    this.pos = e
                }
            }
        }
    }
    o.prototype = {
        err: function(q, u) {
            if (u) {
                if (u < 0) {
                    this.pos += u
                } else {
                    this.pos = u
                }
            }
            h("<b>Error:</b> " + q);
            var e = this.src.substring(0, m.pos),
                p = this.src.substring(m.pos);
            h("in position " + (this.pos + 1) + ": " + e + "<b>&lt;!&gt;</b>" + p);
            throw new Error(q)
        },
        n: function(q) {
            if (q === 0) {
                return ""
            }
            if (!q) {
                q = 1
            }
            if (this.pos + q > this.src.length) {
                this.err("Unexpected end of macros")
            }
            var p = this.pos,
                e = p + q,
                r = this.src.substring(p, e);
            this.pos = e;
            return r
        },
        s: function(p, r) {
            var q = this.pos,
                e = this.src.indexOf(p, q);
            if (e < 0) {
                if (r) {
                    return null
                }
                this.err("Expected " + p + " character in macros")
            }
            this.pos = e + p.length;
            if (q == e) {
                return ""
            }
            return this.src.substring(q, e)
        },
        end: function() {
            return this.pos < this.src.length
        },
        w: function(e) {
            this.dst += e
        },
        wf: function() {
            this.w(this.src.substring(this.pos));
            this.pos = this.src.length
        },
        push: function() {
            this.stk.push(this.dst);
            this.dst = ""
        },
        pop: function() {
            var e = this.dst;
            this.dst = this.stk.pop();
            return e
        },
        clr: function() {
            this.dst = ""
        }
    };

    function f(e) {
        var u, r = e.pos,
            p = e.s("("),
            q = new Macros(p);
        if (!j.test(p.charAt(0))) {
            e.err("Invalid macro name", r)
        }
        e.push();
        a(e);
        q.body = e.pop();
        u = e.n();
        if (u == ";") {} else {
            if (u == "(") {
                e.w("@" + p + u)
            } else {
                e.err("Invalid macros end")
            }
        }
        ChemSys.macros[p] = q
    }

    function i(e, r) {
        e.pos--;
        var q = 0;
        do {
            var x = e.pos,
                v = scanPar(e.src, x);
            if (v >= e.src.length) {
                e.err("Real params list is not closed")
            }
            var u = e.n(v - x),
                w = e.n();
            r[q++] = u;
            if (w == ")") {
                break
            }
        } while (1)
    }

    function n(y, v, u) {
        y.pos--;
        while (1) {
            var p, r, e, q, x = y.pos,
                w = scanPar(y.src, x);
            if (w >= y.src.length) {
                y.err("Formal params list is not closed")
            }
            q = y.n(w - x);
            p = q.indexOf(":");
            if (p < 0) {
                e = q;
                q = ""
            } else {
                e = q.substring(0, p);
                q = q.substring(p + 1)
            }
            if (!c.test(e)) {
                y.err("Invalid parameter name: " + esc(e))
            }
            v[e] = q;
            u.push(e);
            r = y.n();
            if (r == ")") {
                break
            }
        }
    }

    function g(e, v) {
        var E = new o(e);
        var B = E.n(),
            D = {},
            C = [];
        if (B != ")") {
            n(E, D, C)
        }
        if (C.length > 0) {
            var w, q, A, y, x = 0,
                z;
            for (y in v) {
                A = v[y];
                w = A.indexOf(":");
                if (w > 0) {
                    q = A.substring(0, w);
                    if (q in D) {
                        D[q] = A.substring(w + 1);
                        continue
                    }
                }
                q = C[x++];
                if (A) {
                    D[q] = A
                }
            }
            E.wf();
            z = E.dst.split("&");
            for (y = 1; y < z.length; y++) {
                q = "";
                for (A in D) {
                    if (z[y].substring(0, A.length) == A && A.length > q.length) {
                        q = A
                    }
                }
                if (!q) {
                    continue
                }
                z[y] = D[q] + z[y].substring(q.length)
            }
            E = new o("");
            for (y in z) {
                E.src += z[y]
            }
        }
        while (1) {
            B = E.s("@", 1);
            if (B === null) {
                E.wf();
                break
            }
            E.w(B);
            B = E.n();
            if (!j.test(B)) {
                E.err("Invalid macro")
            }
            var p = B + E.s("(");
            var u = ChemSys.macros[p];
            if (!u) {
                E.err("Macros not found: " + p)
            }
            var r = {};
            B = E.n();
            if (B != ")") {
                i(E, r)
            }
            E.w(g(u.body, r))
        }
        return E.dst
    }

    function a(e) {
        var q, p;
        while (1) {
            p = e.s("@", 1);
            if (p === null) {
                e.wf();
                break
            }
            e.w(p);
            q = e.n();
            if (q == ":") {
                f(e)
            } else {
                if (j.test(q)) {
                    e.w("@" + q);
                    continue
                } else {
                    e.pos--;
                    break
                }
            }
        }
    }
    try {
        var m = new o(b);
        a(m);
        if (m.pos != b.length) {
            m.err("Invalid preprocessor finish")
        }
    } catch (l) {
        return {
            ok: 0,
            msg: l.message,
            pos: m.pos
        }
    }
    var d = ")" + m.dst;
    try {
        return {
            ok: 1,
            dst: g(d, {})
        }
    } catch (l) {
        return {
            ok: 0,
            msg: "Runtime error: " + l.message
        }
    }
};