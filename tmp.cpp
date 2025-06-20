#include <iostream>
#include <stack>
using namespace std;

struct Node{
    int val;
    Node *left, *right;
    Node(int x): val(x), left(nullptr), right(nullptr) {}
};

Node* searchDel(Node* root, int k){
    Node* cur = root;
    Node* par = nullptr;

    while(cur && cur->val!=k){
        par = cur;
        if(cur->val > k) cur = cur->left;
        else cur = cur->right;
    }
    if(!cur) return root;


    if(cur->left && cur->right){
        Node* pre = cur->left;
        Node* prePar = cur;

        while(pre->right){
            prePar = pre;
            pre = pre->right;
        }

        cur->val = pre->val; 
        par = prePar; cur = pre;
    }

    Node* child = (cur->left) ? cur->left: cur->right;

    if(!par){
        delete root; return child;
    }

    if(par->left == cur) par->left = child;
    else par->right = child;

    delete cur; 
    return root;
}


int main() {

    return 0;
}
