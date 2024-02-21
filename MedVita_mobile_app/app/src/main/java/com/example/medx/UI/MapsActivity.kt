package com.example.medx.UI

import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationManager
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import com.example.medx.R
import com.example.medx.UI.database.getData.ApiUtilities
import com.example.medx.UI.model.DiseaseLocation
import com.example.medx.UI.model.DiseaseLocationResponse
import com.example.medx.UI.model.LocationData

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.example.medx.databinding.ActivityMapsBinding
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.MapStyleOptions
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.floatingactionbutton.FloatingActionButton

import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityMapsBinding
    private lateinit var currentLocation : Location
    private lateinit var fusedLocationProviderClient: FusedLocationProviderClient
    private lateinit var bottomSheetBehavior: BottomSheetBehavior<View>
    private lateinit var diseaseSpinner: Spinner
    private lateinit var fabOpenBottomSheet: FloatingActionButton

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMapsBinding.inflate(layoutInflater)
        setContentView(binding.root)
        StatusBarUtil.setStatusBarColor(this, R.color.mainColor)

        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this)

        fabOpenBottomSheet = findViewById(R.id.fabOpenBottomSheet)

        getCurrentLocation()
        setupBottomSheet()
    }

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onResume() {
        super.onResume()
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this)

        getCurrentLocation()
    }

    private fun setupBottomSheet() {
        bottomSheetBehavior = BottomSheetBehavior.from(findViewById(R.id.bottom_sheet))
        diseaseSpinner = binding.diseaseSpinner
        bottomSheetBehavior.state = BottomSheetBehavior.STATE_COLLAPSED

        val diseases = arrayOf("Malaria", "Covid", "Dengue", "Jaundice", "Chicken Pox")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, diseases)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        diseaseSpinner.adapter = adapter

        diseaseSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            @RequiresApi(Build.VERSION_CODES.O)
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                val selectedDisease = parent.getItemAtPosition(position).toString()
                if (this@MapsActivity::mMap.isInitialized) {
                    fetchDiseaseLocations(selectedDisease.trim())
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
            }
        }

        bottomSheetBehavior.addBottomSheetCallback(object : BottomSheetBehavior.BottomSheetCallback() {
            override fun onStateChanged(bottomSheet: View, newState: Int) {
                updateFabVisibility(newState)
            }

            override fun onSlide(bottomSheet: View, slideOffset: Float) {

            }
        })

        fabOpenBottomSheet.setOnClickListener {
            bottomSheetBehavior.state = BottomSheetBehavior.STATE_EXPANDED
        }
    }

    private fun fetchDiseaseLocations(selectedDisease: String) {
        val call = ApiUtilities.getMapAPIInterface()?.getDiseaseLocations(selectedDisease)

        call?.enqueue(object : Callback<DiseaseLocationResponse> {
            @RequiresApi(Build.VERSION_CODES.O)
            override fun onResponse(call: Call<DiseaseLocationResponse>, response: Response<DiseaseLocationResponse>) {

                if (response.isSuccessful) {
                    Log.d("TAG", "onDiseaseResponse: ${response.body()}")

                    val locations = response.body()?.diseaseLocations
                    if (locations != null) {
                        updateMarkers(locations, selectedDisease)
                    }
                } else {
                    Toast.makeText(this@MapsActivity, "Unsuccessful Response {${response.code()}}", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<DiseaseLocationResponse>, t: Throwable) {
                Toast.makeText(this@MapsActivity, t.message.toString(), Toast.LENGTH_SHORT).show()
            }
        })
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun updateMarkers(locations: List<DiseaseLocation>, selectedDisease: String) {
        mMap.clear()

        val diseaseTextView = binding.diseaseTextView
        val addLocationTextView = binding.addLocationTextView
        diseaseTextView.text = "Do you have $selectedDisease?"
        addLocationTextView.setOnClickListener {
            val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
            val userToken = sharedPreferences.getString("userToken", null)
            val userId = sharedPreferences.getString("userId", null)
            val popupWindow = MapsPopUpWindow(this, selectedDisease, currentLocation.latitude.toString(),
                currentLocation.longitude.toString(), userId.toString(), userToken.toString())
            popupWindow.show(findViewById(android.R.id.content))
        }

        for (locationData in locations) {
            mMap.addMarker(MarkerOptions()
                .position(LatLng(locationData.location.lat, locationData.location.lng))
                .title("User with ${selectedDisease}").icon(BitmapDescriptorFactory
                    .defaultMarker(getMarkerColor(selectedDisease))))
        }

        val currentLocationLatLng = LatLng(currentLocation.latitude, currentLocation.longitude)
        mMap.addMarker(MarkerOptions().position(currentLocationLatLng).title("Current Location").icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED)))

    }

    private fun updateFabVisibility(newState: Int) {
        if (newState == BottomSheetBehavior.STATE_EXPANDED) {
            fabOpenBottomSheet.visibility = View.INVISIBLE
        } else {
            fabOpenBottomSheet.visibility = View.VISIBLE
        }
    }

    @RequiresApi(Build.VERSION_CODES.M)
    private fun getCurrentLocation() {
        if (checkSelfPermission()){
            if (isLocationEnabled()){
                fusedLocationProviderClient.lastLocation.addOnCompleteListener(this){task ->
                    val location = task.result
                    if(location == null){
                        Toast.makeText(this, "Error while receiving location\nReopen the activity",Toast.LENGTH_SHORT).show()
                    }
                    else{
                        currentLocation = location

                        val mapFragment = supportFragmentManager
                            .findFragmentById(R.id.map) as SupportMapFragment
                        mapFragment.getMapAsync(this)
                    }
                }
            }
            else{
                //settings
                Toast.makeText(this, "Please turn on location",Toast.LENGTH_SHORT).show()
                startActivity(Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS))
            }
        }
        else{
            //request permission here
            requestPermission()
        }
    }

    @RequiresApi(Build.VERSION_CODES.M)
    private fun requestPermission() {
        requestPermissions(arrayOf(android.Manifest.permission.ACCESS_COARSE_LOCATION,
            android.Manifest.permission.ACCESS_FINE_LOCATION), 100)
    }

    private fun checkSelfPermission(): Boolean {
        return (ActivityCompat.checkSelfPermission(this,android.Manifest.permission.ACCESS_FINE_LOCATION)
                ==PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
            this,android.Manifest.permission.ACCESS_COARSE_LOCATION)
                ==PackageManager.PERMISSION_GRANTED)
    }

    private fun isLocationEnabled(): Boolean {
        val locationManager : LocationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
                ||locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
    }

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 100){
            if(grantResults.isNotEmpty() && grantResults[0]==PackageManager.PERMISSION_GRANTED){
                getCurrentLocation()
            }
            else{
                Toast.makeText(this, "Please allow all permissions",Toast.LENGTH_SHORT).show()
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        val style = MapStyleOptions.loadRawResourceStyle(this, R.raw.map_style)
        mMap.setMapStyle(style)
        fetchDiseaseLocations("Malaria")
        val currentLocationLatLng = LatLng(currentLocation.latitude, currentLocation.longitude)
        val currentLocationMarkerOptions = MarkerOptions().position(currentLocationLatLng).title("Current Location").icon(
            BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
        googleMap.addMarker(currentLocationMarkerOptions)
        val zoomLevel = 10f
        googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(currentLocationLatLng, zoomLevel))
    }


    private fun getMarkerColor(disease: String): Float {
        return when (disease) {
            "Malaria" -> BitmapDescriptorFactory.HUE_GREEN
            "Covid" -> BitmapDescriptorFactory.HUE_BLUE
            "Dengue" -> BitmapDescriptorFactory.HUE_YELLOW
            "Jaundice" -> BitmapDescriptorFactory.HUE_VIOLET
            "Chicken Pox" -> BitmapDescriptorFactory.HUE_ORANGE
            else -> BitmapDescriptorFactory.HUE_RED // Default color if the disease is not recognized
        }
    }
}