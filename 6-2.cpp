#include <iostream>
#include <vector>

using namespace std;

int same(vector<int> v, int lo, int hi){
	if(v[lo]>hi)
		return -1;
	int mid = (lo+hi)/2;
	if(v[mid] == mid)
		return mid;
	if(lo>=hi)
		return -1;
	if(v[mid]<mid)
		return same(v,mid+1,high);
	return same(v,lo,mid-1);
}

int main(int argc, char const *argv[])
{
	int n=0;
	cout<<"Enter Size : ";
	cin>>n;
	vector<int> v(n);
	for(int i = 0; i < n; ++i)
	{
		cin>>v[i];
	}

	return 0;
}
