#include <iostream>
using namespace std;


int main()
{
    int soXe = 0;
    cout<<"Nhap so xe: ";
    cin>>soXe;

    int soNut = 0;

    while(soXe>=1)
    {
        soNut += soXe % 10;
        soXe /= 10;
    }
    
    cout<<"So nut: "<<soNut%10;

    return 0;
}