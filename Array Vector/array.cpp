#include<iostream>

using namespace std;

main(int argc, char const *argv[])
{
    int numbers[5], sum = 0;
    cout << "Enter 5 numbers: ";
    //  Storing 5 number entered by user in an array
    //  Finding the sum of numbers entered
    for (int i = 0; i < 5; ++i)
    {
        cin >> numbers[i];
        sum += numbers[i];
    }
    cout << "Sum = " << sum << endl;
    return 0;
}