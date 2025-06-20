#include <iostream>
#include <stack>
#include <vector>
#include <iomanip>
using namespace std;

struct Node
{
    int val;
    Node *left, *right;
    Node(int x) : val(x), left(nullptr), right(nullptr) {}
};


void heapify(vector<int>& a, int size, int i){
    int m = i;
    int c1 = i*2+1, c2 = i*2+2;
    if(c1<size && a[c1]>a[m]) m=c1;
    if(c2<size && a[c2]>a[m]) m=c2;
    if(m!=i){
        swap(a[m], a[i]);
        heapify(a, size, m);
    }
}

void heapSort(vector<int>&a){
    int n = a.size();
    for(int i=0;i<n;i++) cout<<setw(3)<<i<<" ";
    cout<<endl;
    for(int i=(n-1)/2;i>=0;i--){
        heapify(a, n, i);
    }
    for(int x:a) cout<<setw(3)<<x<<" ";
    cout<<endl<<endl;

    for(int i=n-1;i>=0;i--){
        swap(a[i], a[0]);
        for(int x:a) cout<<setw(3)<<x<<" ";
        cout<<endl;
        heapify(a, i, 0);
        for(int x:a) cout<<setw(3)<<x<<" ";
        cout<<endl;
    }

    for(int x:a) cout<<setw(3)<<x<<" ";
}

int main()
{
    vector<int> a = {5, 15, 12, 2, 10, 7, 4, 1, 9, 3};
    heapSort(a);

    return 0;
}
