/*
SPDX-License-Identifier: Apache-2.0
*/

"use strict";

// Utility class for ledger state
const State = require("./../ledger-api/state.js");

// Enumerate commercial paper state values
const cpState = {
    INVOICED: 0,
    APPROVED: 1,
    ISSUED: 2,
    TRADING: 3,
    REDEEMED: 4
};

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class CommercialPaper extends State {
    constructor(obj) {
        super(CommercialPaper.getClass(), [obj.issuer, obj.paperNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
     */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    setIssued(issueDateTime, maturityDateTime) {
        this.issueDateTime = issueDateTime;
        this.maturityDateTime = maturityDateTime;

        this.currentState = cpState.ISSUED;
    }

    setTrading() {
        this.currentState = cpState.TRADING;
    }

    setRedeemed() {
        this.currentState = cpState.REDEEMED;
    }

    setInvoiced() {
        this.currentState = cpState.INVOICED;
    }

    setApproved(approver) {
        this.approver = approver;
        this.currentState = cpState.APPROVED;
    }

    getApprover() {
        return this.approver;
    }

    isIssued() {
        return this.currentState === cpState.ISSUED;
    }

    isTrading() {
        return this.currentState === cpState.TRADING;
    }

    isRedeemed() {
        return this.currentState === cpState.REDEEMED;
    }

    static fromBuffer(buffer) {
        return CommercialPaper.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, CommercialPaper);
    }

    /**
     * Factory method to create a commercial paper object
     */
    // static createInstance(
    //     issuer,
    //     paperNumber,
    //     issueDateTime,
    //     maturityDateTime,
    //     faceValue
    // ) {
    //     return new CommercialPaper({
    //         issuer,
    //         paperNumber,
    //         issueDateTime,
    //         maturityDateTime,
    //         faceValue
    //     });
    // }

    static createInstance(issuer, paperNumber, faceValue) {
        return new CommercialPaper({
            issuer,
            paperNumber,
            faceValue
        });
    }

    static getClass() {
        return "org.papernet.commercialpaper";
    }
}

module.exports = CommercialPaper;
