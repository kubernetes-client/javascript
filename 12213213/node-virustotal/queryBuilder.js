"use strict";
const dateToString = function(input){
  return (input.getFullYear() + "-" + leftPad(input.getMonth() + 1, 2, "0") + "-" + leftPad(input.getDate(), 2, "0") + "T" + leftPad(input.getHours(), 2, "0") + ":" + leftPad(input.getMinutes(), 2, "0") + ":" + leftPad(input.getSeconds(), 2, "0"));
};
var features = {};
features.NOT = function(basis) {
  return "(NOT (" + basis + "))";
};
features.AND = function(basis1, basis2) {
  return "((" + basis1 + ") AND (" + basis2 + "))";
};
features.OR = function(basis1, basis2) {
  return "((" + basis1 + ") OR (" + basis2 + "))";
};
features.NAND = function(basis1, basis2) {
  return features.OR(features.NOT(basis1), features.NOT(basis2));
};
features.NOR = function(basis1, basis2) {
  return features.AND(features.NOT(basis1), features.NOT(basis2));
};
features.EQ = function(basis1, basis2) {
  return features.OR(
    features.AND(basis1, basis2),
    features.NOR(basis1, basis2)
  );
};
features.XOR = function(basis1, basis2) {
  return features.NOT(features.EQ(basis1, basis2));
};
features.IMP = function(basis1, basis2) {
  return features.OR(
    features.NOT(basis1),
    features.AND(basis1, basis2)
  );
};
features.CIM = function(basis1, basis2) {
  return features.AND(features.NOT(basis1), basis2);
};
features.hexSig = function(basis){
  return "content%3A" + basis;
};
features.stringSig = function(basis) {
  return "content%3A\"" + encodeURIComponent(basis) + "\"";
};
features.imphash = function(basis){
  return "imphash%3A" + basis;
};
features.ssdeep = function(src, score){
  return "ssdeep%3A\"" + src + ":" + score + "\"";
};
features.similarTo = function(basis){
  return "similar-to%3A" + basis;
};
features.traffic = function(basis) {
  return "traffic%3A\"" + encodeURIComponent(basis) + "\"";
};
features.suricataString = function(basis) {
  return "suricata%3A\"" + encodeURIComponent(basis) + "\"";
};
features.suricataID = function(basis){
  return "suricata%3A" + basis;
};
features.snortString = function(basis) {
  return "snort%3A\"" + encodeURIComponent(basis) + "\"";
};
features.snortID = function(basis){
  return "snort%3A" + basis;
};
features.behavior = function(basis) {
  return "behavior%3A\"" + encodeURIComponent(basis) + "\"";
};
features.resourceID = function(basis) {
  return "resource%3A\"" + encodeURIComponent(basis) + "\"";
};
features.resourceType = function(basis) {
  return "resource%3A\"" + encodeURIComponent(basis) + "\"";
};
features.exports = function(basis){
  return "exports%3A\"" + encodeURIComponent(basis) + "\"";
};
features.imports = function(basis){
  return "imports%3A\"" + encodeURIComponent(basis) + "\"";
};
features.segment = function(basis){
  return "segment%3A\"" + encodeURIComponent(basis) + "\"";
};
features.sectionHash = function(basis){
  return "section%3A" + basis;
};
features.sectionLabel = function(basis) {
  return "section%3A\"" + encodeURIComponent(basis) + "\"";
};
features.atMostSubspan = function(basis) {
  return "subspan%3A" + basis + "-";
};
features.atLeastSubspan = function(basis) {
  return "subspan%3A" + basis + "%2B";
};
features.compilationBefore = function(basis) {
  return "pets%3A" + dateToString(basis) + "-";
};
features.compilationAfter = function(basis) {
  return "pets%3A" + dateToString(basis) + "%2B";
};
features.sigcheck = function(basis) {
  return "signature%3A\"" + encodeURIComponent(basis) + "\"";
};
features.lang = function(basis) {
  return "lang%3A\"" + encodeURIComponent(basis) + "\"";
};
features.androguard = function(basis) {
  return "androguard%3A\"" + encodeURIComponent(basis) + "\"";
};
features.metadata = function(basis) {
  return "metadata%3A\"" + encodeURIComponent(basis) + "\"";
};
features.fromURL = function(basis) {
  return "itw%3A\"" + encodeURIComponent(basis) + "\"";
};
features.submitterRegion = function(basis){
  return "submitter%3A" + basis;
};
features.sourceCount = function(basis){
  return "sources%3A" + basis;
};
features.sourceAtLeast = function(basis){
  return "sources%3A" + basis + "%2B";
};
features.sourceAtMost = function(basis){
  return "sources%3A" + basis + "-";
};
features.submissionCount = function(basis){
  return "submissions%3A" + basis;
};
features.submissionAtLeast = function(basis){
  return "submissions%3A" + basis + "%2B";
};
features.submissionAtMost = function(basis){
  return "submissions%3A" + basis + "-";
};
features.tag = function(basis){
  return "tag%3A" + basis;
};
features.name = function(basis){
  return "name%3A" + basis;
};
features.childPositives = function(basis){
  return "children_positives%3A" + basis;
};
features.childPositivesAtLeast = function(basis){
  return "children_positives%3A" + basis + "%2B";
};
features.childPositivesAtMost = function(basis){
  return "children_positives%3A" + basis + "-";
};
features.positives = function(basis){
  return "positives%3A" + basis;
};
features.positivesAtLeast = function(basis){
  return "positives%3A" + basis + "%2B";
};
features.positivesAtMost = function(basis){
  return "positives%3A" + basis + "-";
};
features.lastAnalyzedBefore = function(basis) {
  return "la%3A" + dateToString(basis) + "-";
};
features.lastAnalyzedAfter = function(basis) {
  return "la%3A" + dateToString(basis) + "%2B";
};
features.lastSubmittedBefore = function(basis) {
  return "ls%3A" + dateToString(basis) + "-";
};
features.lastSubmittedAfter = function(basis) {
  return "ls%3A" + dateToString(basis) + "%2B";
};
features.firstSubmittedBefore = function(basis) {
  return "fs%3A" + dateToString(basis) + "-";
};
features.firstSubmittedAfter = function(basis) {
  return "fs%3A" + dateToString(basis) + "%2B";
};
features.type = function(basis){
  return "type%3A" + basis;
};
features.size = function(basis){
  return "size%3A" + basis;
};
features.sizeAtLeast = function(basis){
  return "size%3A" + basis + "%2B";
};
features.sizeAtMost = function(basis){
  return "size%3A" + basis + "-";
};
module.exports = exports = features;
