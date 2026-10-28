import { NotImplementedError } from "../extensions/index.js";

import { Node } from '../extensions/list-tree.js';

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
export default class BinarySearchTree {
  constructor() { this.rootNode = null; }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = new Node(data);
    if (!this.rootNode) { this.rootNode = node; return; }
    let current = this.rootNode;
    while (true) {
      if (data === current.data) return;
      const side = data < current.data ? "left" : "right";
      if (!current[side]) { current[side] = node; return; }
      current = current[side];
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this.rootNode;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  removeNode(node, data) {
    if (!node) return null;
    if (data < node.data) { node.left = this.removeNode(node.left, data); return node; }
    if (data > node.data) { node.right = this.removeNode(node.right, data); return node; }
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    let successor = node.right;
    while (successor.left) successor = successor.left;
    node.data = successor.data;
    node.right = this.removeNode(node.right, successor.data);
    return node;
  }
  
  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) return null;
    let c = this.rootNode;
    while (c.left) c = c.left;
    return c.data;
  }

  max() {
    if (!this.rootNode) return null;
    let c = this.rootNode;
    while (c.right) c = c.right;
    return c.data;
  }
};
