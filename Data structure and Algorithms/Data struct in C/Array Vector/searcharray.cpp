#include <iostream>

using namespace std;

int busca_r(int x, int n, int v[])
{
    if (n == 0)
        return -1;
    if (x == v[n - 1])
        return n - 1;
    return busca_r(x, n - 1, v);
}

main(int argc, char const *argv[])
{
    int numbers[100];

    for (int i = 0; i < 100; ++i)
    {
        //cin >> numbers[i];
        numbers[i] = i ;
    }
    int n = busca_r(55,100, numbers);
    cout << "Number is = " << n << endl;
        return 0;
}